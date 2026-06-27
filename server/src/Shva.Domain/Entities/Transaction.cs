using Shva.Domain.Enums;
using Shva.Domain.Regions;

namespace Shva.Domain.Entities;

/// <summary>
/// A submitted transaction simulation together with the evaluated approval outcome.
/// Both approved and rejected transactions are persisted.
/// </summary>
public class Transaction
{
    public Guid Id { get; set; }

    public string RegionKey { get; set; } = default!;

    public string RegionName { get; set; } = default!;

    public DateTimeOffset SubmittedAtUtc { get; set; }

    public DateTime LocalTimeAtRegion { get; set; }

    public TransactionStatus Status { get; set; }

    public DateTimeOffset CreatedAtUtc { get; set; }

    public Guid? UserId { get; set; }

    public User? User { get; set; }

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
