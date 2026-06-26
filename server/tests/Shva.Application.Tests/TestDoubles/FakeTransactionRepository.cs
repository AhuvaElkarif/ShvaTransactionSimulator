using Shva.Application.Common.Interfaces;
using Shva.Domain.Entities;
using Shva.Domain.Enums;

namespace Shva.Application.Tests.TestDoubles;

/// <summary>In-memory <see cref="ITransactionRepository"/> capturing saved transactions for assertions.</summary>
public sealed class FakeTransactionRepository : ITransactionRepository
{
    /// <summary>Everything that was persisted, in insertion order.</summary>
    public List<Transaction> Saved { get; } = [];

    public Task AddAsync(Transaction transaction, CancellationToken cancellationToken = default)
    {
        Saved.Add(transaction);
        return Task.CompletedTask;
    }

    public Task<IReadOnlyList<Transaction>> GetApprovedAsync(int limit, CancellationToken cancellationToken = default)
    {
        IReadOnlyList<Transaction> approved = Saved
            .Where(t => t.Status == TransactionStatus.Approved)
            .OrderByDescending(t => t.CreatedAtUtc)
            .Take(limit)
            .ToList();
        return Task.FromResult(approved);
    }
}
