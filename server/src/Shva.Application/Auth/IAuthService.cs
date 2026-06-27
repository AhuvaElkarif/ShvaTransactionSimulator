using Shva.Application.Auth.Dtos;

namespace Shva.Application.Auth;

public interface IAuthService
{
    Task<AuthResponse> SignupAsync(SignupRequest request, CancellationToken cancellationToken = default);

    Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default);
}
