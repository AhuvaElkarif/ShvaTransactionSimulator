namespace Shva.Domain.Entities;

/// <summary>
/// An application user able to authenticate and own transaction simulations.
/// </summary>
public class User
{
    public Guid Id { get; set; }

    public string Email { get; set; } = default!;

    public string PasswordHash { get; set; } = default!;

    public DateTimeOffset CreatedAtUtc { get; set; }

    public ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
