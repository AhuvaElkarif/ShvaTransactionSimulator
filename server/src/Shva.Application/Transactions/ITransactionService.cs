using Shva.Application.Transactions.Dtos;

namespace Shva.Application.Transactions;

/// <summary>
/// Use cases for simulating transactions and reading the approved ones.
/// </summary>
public interface ITransactionService
{
    /// <summary>
    /// Evaluates a submission against the selected region's banking hours, persists the result
    /// (approved or rejected) and returns the outcome.
    /// </summary>
    /// <param name="request">The region and submitted instant.</param>
    /// <param name="userId">Owning user, or <c>null</c> for an anonymous submission.</param>
    Task<TransactionResultDto> SimulateAsync(
        SimulateTransactionRequest request, Guid? userId, CancellationToken cancellationToken = default);

    /// <summary>Returns the most recent approved transactions for display.</summary>
    Task<IReadOnlyList<ApprovedTransactionDto>> GetApprovedAsync(
        int limit, CancellationToken cancellationToken = default);
}
