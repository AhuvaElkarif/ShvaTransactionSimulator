using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Shva.Application.Common.Interfaces;
using Shva.Infrastructure.Authentication;
using Shva.Infrastructure.Persistence;
using Shva.Infrastructure.Persistence.Repositories;
using Shva.Infrastructure.Services;

namespace Shva.Infrastructure;

/// <summary>
/// Composition root for the Infrastructure layer: EF Core, repositories and the cross-cutting
/// services (clock, time zone, password hashing, JWT issuing) that back the Application ports.
/// </summary>
public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? throw new InvalidOperationException("Connection string 'DefaultConnection' is not configured.");

        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(connectionString, sql => sql.EnableRetryOnFailure()));

        services.AddScoped<ITransactionRepository, TransactionRepository>();
        services.AddScoped<IUserRepository, UserRepository>();

        services.AddSingleton<IClock, SystemClock>();
        services.AddSingleton<ITimeZoneService, TimeZoneService>();
        services.AddSingleton<IPasswordHasher, BCryptPasswordHasher>();

        services.Configure<JwtOptions>(configuration.GetSection(JwtOptions.SectionName));
        services.AddScoped<IJwtTokenService, JwtTokenService>();

        return services;
    }
}
