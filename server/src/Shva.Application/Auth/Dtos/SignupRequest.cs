namespace Shva.Application.Auth.Dtos;

/// <summary>Registration request.</summary>
public sealed record SignupRequest
{
    /// <summary>Email used as the unique login identifier.</summary>
    public string Email { get; init; } = default!;

    /// <summary>Plain-text password (hashed server-side, never stored).</summary>
    public string Password { get; init; } = default!;
}
