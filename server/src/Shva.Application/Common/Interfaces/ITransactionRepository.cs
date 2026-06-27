using Shva.Domain.Entities;

namespace Shva.Application.Common.Interfaces;

/// <summary>
/// Persistence boundary for <see cref="Transaction"/> aggregates.
/// </summary>
public interface ITransactionRepository
{
    Task AddAsync(Transaction transaction, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Transaction>> GetApprovedAsync(int limit, CancellationToken cancellationToken = default);
}
