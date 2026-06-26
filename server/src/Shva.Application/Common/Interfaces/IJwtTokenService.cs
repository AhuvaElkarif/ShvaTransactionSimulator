using Shva.Domain.Entities;

namespace Shva.Application.Common.Interfaces;

/// <summary>
/// Issues signed JWT access tokens for authenticated users. Implemented in Infrastructure.
/// </summary>
public interface IJwtTokenService
{
    /// <summary>Creates a signed token for the user and reports its UTC expiry.</summary>
    (string Token, DateTimeOffset ExpiresAtUtc) CreateToken(User user);
}
