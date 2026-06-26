using Shva.Domain.Entities;

namespace Shva.Application.Common.Interfaces;

/// <summary>
/// Persistence boundary for <see cref="Transaction"/> aggregates.
/// </summary>
public interface ITransactionRepository
{
    /// <summary>Persists a new transaction (approved or rejected).</summary>
    Task AddAsync(Transaction transaction, CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns the most recent approved transactions, newest first, capped at <paramref name="limit"/>.
    /// </summary>
    Task<IReadOnlyList<Transaction>> GetApprovedAsync(int limit, CancellationToken cancellationToken = default);
}
