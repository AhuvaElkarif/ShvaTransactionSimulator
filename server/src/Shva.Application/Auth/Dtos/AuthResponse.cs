namespace Shva.Application.Auth.Dtos;

/// <summary>Successful authentication result containing the bearer token.</summary>
public sealed record AuthResponse
{
    /// <summary>Signed JWT access token.</summary>
    public string Token { get; init; } = default!;

    /// <summary>UTC instant at which the token expires.</summary>
    public DateTimeOffset ExpiresAtUtc { get; init; }

    /// <summary>The authenticated user's email.</summary>
    public string Email { get; init; } = default!;
}
