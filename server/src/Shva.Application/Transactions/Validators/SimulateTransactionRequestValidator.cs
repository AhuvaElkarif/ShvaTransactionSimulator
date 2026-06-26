using FluentValidation;
using Shva.Application.Transactions.Dtos;
using Shva.Domain.Regions;

namespace Shva.Application.Transactions.Validators;

/// <summary>
/// Validates that a simulation request targets a supported region and carries a real timestamp.
/// </summary>
public sealed class SimulateTransactionRequestValidator : AbstractValidator<SimulateTransactionRequest>
{
    public SimulateTransactionRequestValidator()
    {
        RuleFor(x => x.Region)
            .NotEmpty().WithMessage("Region is required.")
            .Must(RegionCatalog.IsSupported)
            .WithMessage(x => $"Region '{x.Region}' is not supported.");

        RuleFor(x => x.Timestamp)
            .NotEqual(default(DateTimeOffset)).WithMessage("Timestamp is required.");
    }
}
