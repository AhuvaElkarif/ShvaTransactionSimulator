namespace Shva.Application.Transactions.Dtos;

/// <summary>
/// Client request to simulate a transaction against a region's banking hours.
/// </summary>
public sealed record SimulateTransactionRequest
{
    /// <summary>Target region key (e.g. "IL", "FR", "US", "JP").</summary>
    public string Region { get; init; } = default!;

    /// <summary>
    /// The absolute instant the transaction is "submitted at". Any offset is accepted and
    /// normalized to UTC server-side; the server then derives the region's local time from it.
    /// </summary>
    public DateTimeOffset Timestamp { get; init; }
}
