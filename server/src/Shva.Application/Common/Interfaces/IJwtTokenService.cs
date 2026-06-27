using Shva.Domain.Entities;

namespace Shva.Application.Common.Interfaces;

/// <summary>
/// Issues signed JWT access tokens for authenticated users. Implemented in Infrastructure.
/// </summary>
public interface IJwtTokenService
{
    (string Token, DateTimeOffset ExpiresAtUtc) CreateToken(User user);
}
