using Shva.Application.Transactions.Dtos;

namespace Shva.Application.Transactions;

/// <summary>
/// Use cases for simulating transactions and reading the approved ones.
/// </summary>
public interface ITransactionService
{
    Task<TransactionResultDto> SimulateAsync(
        SimulateTransactionRequest request, Guid? userId, CancellationToken cancellationToken = default);

    Task<IReadOnlyList<ApprovedTransactionDto>> GetApprovedAsync(
        int limit, CancellationToken cancellationToken = default);
}
