namespace Shva.Application.Transactions.Dtos;

/// <summary>
/// Outcome of a transaction simulation returned to the client.
/// </summary>
public sealed record TransactionResultDto
{
    /// <summary>Identifier of the persisted transaction.</summary>
    public Guid Id { get; init; }

    /// <summary>Region key the transaction targeted.</summary>
    public string Region { get; init; } = default!;

    /// <summary>Human-readable region name.</summary>
    public string RegionName { get; init; } = default!;

    /// <summary>"Approved" or "Rejected".</summary>
    public string Status { get; init; } = default!;

    /// <summary>The submitted instant, in UTC.</summary>
    public DateTimeOffset SubmittedAtUtc { get; init; }

    /// <summary>The local wall-clock time in the region the rule was evaluated against.</summary>
    public DateTime LocalTimeAtRegion { get; init; }

    /// <summary>Human-readable explanation of why the transaction was approved/rejected.</summary>
    public string Reason { get; init; } = default!;
}
