using Shva.Application.Auth.Dtos;

namespace Shva.Application.Auth;

/// <summary>Registration and login use cases.</summary>
public interface IAuthService
{
    /// <summary>Registers a new user and returns an access token.</summary>
    Task<AuthResponse> SignupAsync(SignupRequest request, CancellationToken cancellationToken = default);

    /// <summary>Authenticates an existing user and returns an access token.</summary>
    Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default);
}
