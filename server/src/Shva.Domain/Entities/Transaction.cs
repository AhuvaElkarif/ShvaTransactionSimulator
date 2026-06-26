using Shva.Domain.Enums;
using Shva.Domain.Regions;

namespace Shva.Domain.Entities;

/// <summary>
/// A submitted transaction simulation together with the evaluated approval outcome.
/// Both approved and rejected transactions are persisted.
/// </summary>
public class Transaction
{
    /// <summary>Primary key.</summary>
    public Guid Id { get; set; }

    /// <summary>Language-neutral region key the transaction targeted (e.g. "IL").</summary>
    public string RegionKey { get; set; } = default!;

    /// <summary>Human-readable region name captured at submission time (e.g. "Israel").</summary>
    public string RegionName { get; set; } = default!;

    /// <summary>The absolute instant submitted by the client, normalized to UTC.</summary>
    public DateTimeOffset SubmittedAtUtc { get; set; }

    /// <summary>
    /// The wall-clock local time in the target region at <see cref="SubmittedAtUtc"/>.
    /// This is the value the banking-hours rule is evaluated against.
    /// </summary>
    public DateTime LocalTimeAtRegion { get; set; }

    /// <summary>The evaluated outcome (<see cref="TransactionStatus.Approved"/> / <see cref="TransactionStatus.Rejected"/>).</summary>
    public TransactionStatus Status { get; set; }

    /// <summary>UTC instant the record was created on the server.</summary>
    public DateTimeOffset CreatedAtUtc { get; set; }

    /// <summary>Optional owner; null for anonymous submissions.</summary>
    public Guid? UserId { get; set; }

    /// <summary>Navigation to the owning user, when present.</summary>
    public User? User { get; set; }

    /// <summary>
    /// Factory that builds a fully-populated transaction from an evaluated result.
    /// Keeps construction consistent and the entity's setters out of the orchestration code.
    /// </summary>
    public static Transaction Create(
        Region region,
        DateTimeOffset submittedAtUtc,
        DateTime localTimeAtRegion,
        TransactionStatus status,
        DateTimeOffset createdAtUtc,
        Guid? userId) => new()
        {
            Id = Guid.NewGuid(),
            RegionKey = region.Key,
            RegionName = region.DisplayName,
            SubmittedAtUtc = submittedAtUtc,
            LocalTimeAtRegion = localTimeAtRegion,
            Status = status,
            CreatedAtUtc = createdAtUtc,
            UserId = userId
        };
}
