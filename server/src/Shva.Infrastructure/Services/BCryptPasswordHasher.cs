using Shva.Application.Common.Interfaces;

namespace Shva.Infrastructure.Services;

/// <summary><see cref="IPasswordHasher"/> implemented with BCrypt (per-password salt built in).</summary>
public sealed class BCryptPasswordHasher : IPasswordHasher
{
    public string Hash(string password) => BCrypt.Net.BCrypt.HashPassword(password);

    public bool Verify(string password, string hash) => BCrypt.Net.BCrypt.Verify(password, hash);
}
