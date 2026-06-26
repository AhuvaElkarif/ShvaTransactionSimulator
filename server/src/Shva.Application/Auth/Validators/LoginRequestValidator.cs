using FluentValidation;
using Shva.Application.Auth.Dtos;

namespace Shva.Application.Auth.Validators;

/// <summary>Ensures login requests carry both fields before hitting the data store.</summary>
public sealed class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator()
    {
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty();
    }
}
