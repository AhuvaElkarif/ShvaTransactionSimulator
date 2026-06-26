using FluentValidation;
using Shva.Application.Auth.Dtos;
using Shva.Application.Common.Exceptions;
using Shva.Application.Common.Interfaces;
using Shva.Domain.Entities;

namespace Shva.Application.Auth;

/// <summary>
/// Implements registration and login. Passwords are hashed via <see cref="IPasswordHasher"/> and
/// access tokens issued via <see cref="IJwtTokenService"/>; this class never sees a stored secret.
/// </summary>
public sealed class AuthService(
    IValidator<SignupRequest> signupValidator,
    IValidator<LoginRequest> loginValidator,
    IUserRepository userRepository,
    IPasswordHasher passwordHasher,
    IJwtTokenService jwtTokenService,
    IClock clock) : IAuthService
{
    /// <inheritdoc />
    public async Task<AuthResponse> SignupAsync(SignupRequest request, CancellationToken cancellationToken = default)
    {
        await signupValidator.ValidateAndThrowAsync(request, cancellationToken);

        var email = Normalize(request.Email);
        if (await userRepository.ExistsByEmailAsync(email, cancellationToken))
        {
            throw new ConflictException("An account with this email already exists.");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            Email = email,
            PasswordHash = passwordHasher.Hash(request.Password),
            CreatedAtUtc = clock.UtcNow
        };

        await userRepository.AddAsync(user, cancellationToken);
        return CreateAuthResponse(user);
    }

    /// <inheritdoc />
    public async Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default)
    {
        await loginValidator.ValidateAndThrowAsync(request, cancellationToken);

        var email = Normalize(request.Email);
        var user = await userRepository.GetByEmailAsync(email, cancellationToken);

        // Same error whether the email is unknown or the password is wrong (avoids user enumeration).
        if (user is null || !passwordHasher.Verify(request.Password, user.PasswordHash))
        {
            throw new UnauthorizedException("Invalid email or password.");
        }

        return CreateAuthResponse(user);
    }

    private AuthResponse CreateAuthResponse(User user)
    {
        var (token, expiresAt) = jwtTokenService.CreateToken(user);
        return new AuthResponse { Token = token, ExpiresAtUtc = expiresAt, Email = user.Email };
    }

    private static string Normalize(string email) => email.Trim().ToLowerInvariant();
}
