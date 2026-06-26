namespace Shva.Application.Auth.Dtos;

/// <summary>Login request.</summary>
public sealed record LoginRequest
{
    /// <summary>Account email.</summary>
    public string Email { get; init; } = default!;

    /// <summary>Account password.</summary>
    public string Password { get; init; } = default!;
}
