namespace Shva.Domain.Entities;

/// <summary>
/// An application user able to authenticate and own transaction simulations.
/// </summary>
public class User
{
    /// <summary>Primary key.</summary>
    public Guid Id { get; set; }

    /// <summary>Unique login email (stored normalized to lower-case).</summary>
    public string Email { get; set; } = default!;

    /// <summary>BCrypt hash of the user's password. The plain password is never stored.</summary>
    public string PasswordHash { get; set; } = default!;

    /// <summary>UTC instant the account was created.</summary>
    public DateTimeOffset CreatedAtUtc { get; set; }

    /// <summary>Transactions submitted by this user.</summary>
    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
