namespace Shva.Application.Auth.Dtos;

public sealed record LoginRequest
{
    public string Email { get; init; } = default!;

    public string Password { get; init; } = default!;
}
