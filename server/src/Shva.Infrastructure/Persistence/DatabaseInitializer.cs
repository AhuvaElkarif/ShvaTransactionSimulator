using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Shva.Infrastructure.Persistence;

/// <summary>
/// Applies pending EF Core migrations at startup. Retries while the database becomes reachable,
/// which matters when the API and SQL Server containers boot together under Docker Compose.
/// </summary>
public static class DatabaseInitializer
{
    public static async Task MigrateAsync(
        IServiceProvider services, int maxAttempts = 12, CancellationToken cancellationToken = default)
    {
        using var scope = services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var logger = scope.ServiceProvider
            .GetService<ILoggerFactory>()?
            .CreateLogger(nameof(DatabaseInitializer));

        for (var attempt = 1; ; attempt++)
        {
            try
            {
                await dbContext.Database.MigrateAsync(cancellationToken);
                logger?.LogInformation("Database is up to date (migrations applied).");
                return;
            }
            catch (Exception ex) when (attempt < maxAttempts)
            {
                logger?.LogWarning(
                    ex, "Database not ready (attempt {Attempt}/{Max}); retrying in 3s.", attempt, maxAttempts);
                await Task.Delay(TimeSpan.FromSeconds(3), cancellationToken);
            }
        }
    }
}
