using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using Shva.Application.Auth;
using Shva.Application.Transactions;

namespace Shva.Application;

/// <summary>
/// Composition root for the Application layer. Registers use-case services and all validators so
/// the host (API) only needs to call <c>AddApplication()</c>.
/// </summary>
public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);

        services.AddScoped<ITransactionService, TransactionService>();
        services.AddScoped<IAuthService, AuthService>();

        return services;
    }
}
