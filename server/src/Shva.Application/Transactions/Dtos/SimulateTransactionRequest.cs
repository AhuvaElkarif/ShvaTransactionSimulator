namespace Shva.Application.Transactions.Dtos;

/// <summary>
/// Client request to simulate a transaction against a region's banking hours.
/// </summary>
public sealed record SimulateTransactionRequest
{
    public string Region { get; init; } = default!;

    public DateTimeOffset Timestamp { get; init; }
}
