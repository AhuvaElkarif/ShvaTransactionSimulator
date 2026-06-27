using Microsoft.EntityFrameworkCore;
using Shva.Application.Common.Interfaces;
using Shva.Domain.Entities;
using Shva.Domain.Enums;
using Shva.Infrastructure.Persistence;

namespace Shva.Infrastructure.Persistence.Repositories;

/// <summary>EF Core implementation of <see cref="ITransactionRepository"/>.</summary>
public sealed class TransactionRepository(AppDbContext dbContext) : ITransactionRepository
{
    public async Task AddAsync(Transaction transaction, CancellationToken cancellationToken = default)
    {
        dbContext.Transactions.Add(transaction);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<IReadOnlyList<Transaction>> GetApprovedAsync(int limit, CancellationToken cancellationToken = default)
        => await dbContext.Transactions
            .AsNoTracking()
            .Where(t => t.Status == TransactionStatus.Approved)
            .OrderByDescending(t => t.CreatedAtUtc)
            .Take(limit)
            .ToListAsync(cancellationToken);
}
