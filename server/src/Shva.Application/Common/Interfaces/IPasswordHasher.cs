namespace Shva.Application.Common.Interfaces;

/// <summary>
/// Hashes and verifies user passwords. Implemented in Infrastructure (BCrypt).
/// </summary>
public interface IPasswordHasher
{
    /// <summary>Produces a salted hash for the supplied plain-text password.</summary>
    string Hash(string password);

    /// <summary>Verifies a plain-text password against a previously produced hash.</summary>
    bool Verify(string password, string hash);
}
