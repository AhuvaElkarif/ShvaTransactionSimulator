using Microsoft.EntityFrameworkCore;
using Shva.Domain.Entities;

namespace Shva.Infrastructure.Persistence;

/// <summary>
/// EF Core unit of work for the simulator. Entity mappings live in the
/// <c>Persistence/Configurations</c> folder and are applied automatically.
/// </summary>
public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Transaction> Transactions => Set<Transaction>();

    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}
