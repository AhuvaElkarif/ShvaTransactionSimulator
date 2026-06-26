using Microsoft.AspNetCore.Mvc;
using Shva.API.Extensions;
using Shva.Application.Transactions;
using Shva.Application.Transactions.Dtos;

namespace Shva.API.Controllers;

/// <summary>
/// Endpoints for simulating transactions and reading the approved ones shown in the UI cards.
/// </summary>
[ApiController]
[Route("api/transactions")]
[Produces("application/json")]
public sealed class TransactionsController(ITransactionService transactionService) : ControllerBase
{
    /// <summary>
    /// Simulates a transaction. Returns the outcome (Approved/Rejected) after evaluating the
    /// submitted instant against the selected region's banking hours. The result is persisted.
    /// </summary>
    [HttpPost("simulate")]
    [ProducesResponseType(typeof(TransactionResultDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<TransactionResultDto>> Simulate(
        [FromBody] SimulateTransactionRequest request, CancellationToken cancellationToken)
    {
        var result = await transactionService.SimulateAsync(request, User.GetUserId(), cancellationToken);
        return Ok(result);
    }

    /// <summary>Returns the most recent approved transactions for display.</summary>
    /// <param name="limit">Maximum number of items to return (default 20).</param>
    [HttpGet("approved")]
    [ProducesResponseType(typeof(IReadOnlyList<ApprovedTransactionDto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<IReadOnlyList<ApprovedTransactionDto>>> GetApproved(
        [FromQuery] int limit = 20, CancellationToken cancellationToken = default)
    {
        var approved = await transactionService.GetApprovedAsync(limit, cancellationToken);
        return Ok(approved);
    }
}
