namespace Shva.Application.Transactions.Dtos;

/// <summary>
/// Outcome of a transaction simulation returned to the client.
/// </summary>
public sealed record TransactionResultDto
{
    public Guid Id { get; init; }

    public string Region { get; init; } = default!;

    public string RegionName { get; init; } = default!;

    /// <summary>"Approved" or "Rejected".</summary>
    public string Status { get; init; } = default!;

    public DateTimeOffset SubmittedAtUtc { get; init; }

    public DateTime LocalTimeAtRegion { get; init; }

    public string Reason { get; init; } = default!;
}
