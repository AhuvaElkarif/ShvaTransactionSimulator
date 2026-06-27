namespace Shva.Application.Auth.Dtos;

public sealed record AuthResponse
{
    public string Token { get; init; } = default!;

    public DateTimeOffset ExpiresAtUtc { get; init; }

    public string Email { get; init; } = default!;
}
