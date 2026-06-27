using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Shva.Infrastructure.Persistence;

/// <summary>
/// Lets the EF Core CLI (<c>dotnet ef</c>) build the context at design time without booting the API.
/// Reads the connection string from the <c>ConnectionStrings__DefaultConnection</c> environment
/// variable when present, otherwise falls back to the local SQL Server LocalDB instance.
/// </summary>
public sealed class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    private const string LocalDbConnectionString =
        "Server=(localdb)\\MSSQLLocalDB;Database=ShvaTransactionSimulator;Trusted_Connection=True;TrustServerCertificate=True";

    public AppDbContext CreateDbContext(string[] args)
    {
        var connectionString =
            Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection") ?? LocalDbConnectionString;

        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlServer(connectionString)
            .Options;

        return new AppDbContext(options);
    }
}
