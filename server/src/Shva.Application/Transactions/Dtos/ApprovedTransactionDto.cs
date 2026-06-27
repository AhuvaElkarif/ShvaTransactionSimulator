namespace Shva.Application.Transactions.Dtos;

/// <summary>
/// Projection of an approved transaction used to populate the approved-transaction cards.
/// </summary>
public sealed record ApprovedTransactionDto
{
    public Guid Id { get; init; }

    public string Region { get; init; } = default!;

    public string RegionName { get; init; } = default!;

    public DateTime LocalTimeAtRegion { get; init; }

    public DateTimeOffset SubmittedAtUtc { get; init; }

    public DateTimeOffset CreatedAtUtc { get; init; }
}
