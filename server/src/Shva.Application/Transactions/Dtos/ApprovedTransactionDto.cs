namespace Shva.Application.Transactions.Dtos;

/// <summary>
/// Projection of an approved transaction used to populate the approved-transaction cards.
/// </summary>
public sealed record ApprovedTransactionDto
{
    /// <summary>Identifier of the transaction.</summary>
    public Guid Id { get; init; }

    /// <summary>Region key.</summary>
    public string Region { get; init; } = default!;

    /// <summary>Human-readable region name.</summary>
    public string RegionName { get; init; } = default!;

    /// <summary>Local wall-clock time in the region at submission.</summary>
    public DateTime LocalTimeAtRegion { get; init; }

    /// <summary>The submitted instant, in UTC.</summary>
    public DateTimeOffset SubmittedAtUtc { get; init; }

    /// <summary>When the transaction was recorded.</summary>
    public DateTimeOffset CreatedAtUtc { get; init; }
}
