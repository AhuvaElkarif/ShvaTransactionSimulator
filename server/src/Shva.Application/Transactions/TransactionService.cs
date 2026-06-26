using System.Globalization;
using FluentValidation;
using Shva.Application.Common.Exceptions;
using Shva.Application.Common.Interfaces;
using Shva.Application.Transactions.Dtos;
using Shva.Domain.Banking;
using Shva.Domain.Entities;
using Shva.Domain.Enums;
using Shva.Domain.Regions;

namespace Shva.Application.Transactions;

/// <summary>
/// Orchestrates the transaction-simulation use case. Pure application logic: it depends only on
/// abstractions (clock, time-zone service, repository) so it is fully unit-testable, while the
/// banking-hours rule itself lives in the Domain (<see cref="BankingHours"/>).
/// </summary>
public sealed class TransactionService(
    IValidator<SimulateTransactionRequest> validator,
    ITimeZoneService timeZoneService,
    ITransactionRepository repository,
    IClock clock) : ITransactionService
{
    /// <summary>Max number of approved transactions surfaced to the UI cards.</summary>
    public const int DefaultApprovedLimit = 20;

    /// <inheritdoc />
    public async Task<TransactionResultDto> SimulateAsync(
        SimulateTransactionRequest request, Guid? userId, CancellationToken cancellationToken = default)
    {
        await validator.ValidateAndThrowAsync(request, cancellationToken);

        // Validator guarantees the region is supported, so Find never returns null here.
        var region = RegionCatalog.Find(request.Region)!;

        var submittedUtc = request.Timestamp.ToUniversalTime();
        var localTime = timeZoneService.ConvertUtcToLocal(submittedUtc, region.IanaTimeZoneId);

        var hours = BankingHours.Standard;
        var isApproved = hours.Contains(TimeOnly.FromDateTime(localTime));
        var status = isApproved ? TransactionStatus.Approved : TransactionStatus.Rejected;

        var transaction = Transaction.Create(region, submittedUtc, localTime, status, clock.UtcNow, userId);
        await repository.AddAsync(transaction, cancellationToken);

        return new TransactionResultDto
        {
            Id = transaction.Id,
            Region = region.Key,
            RegionName = region.DisplayName,
            Status = status.ToString(),
            SubmittedAtUtc = submittedUtc,
            LocalTimeAtRegion = localTime,
            Reason = BuildReason(region, localTime, hours, isApproved)
        };
    }

    /// <inheritdoc />
    public async Task<IReadOnlyList<ApprovedTransactionDto>> GetApprovedAsync(
        int limit, CancellationToken cancellationToken = default)
    {
        if (limit <= 0)
        {
            limit = DefaultApprovedLimit;
        }

        var approved = await repository.GetApprovedAsync(limit, cancellationToken);

        return approved
            .Select(t => new ApprovedTransactionDto
            {
                Id = t.Id,
                Region = t.RegionKey,
                RegionName = t.RegionName,
                LocalTimeAtRegion = t.LocalTimeAtRegion,
                SubmittedAtUtc = t.SubmittedAtUtc,
                CreatedAtUtc = t.CreatedAtUtc
            })
            .ToList();
    }

    private static string BuildReason(Region region, DateTime localTime, BankingHours hours, bool approved)
    {
        var local = localTime.ToString("HH:mm", CultureInfo.InvariantCulture);
        var window = $"{hours.Open:HH\\:mm}–{hours.Close:HH\\:mm}";
        return approved
            ? $"Local time {local} in {region.DisplayName} is within banking hours ({window})."
            : $"Local time {local} in {region.DisplayName} is outside banking hours ({window}).";
    }
}
