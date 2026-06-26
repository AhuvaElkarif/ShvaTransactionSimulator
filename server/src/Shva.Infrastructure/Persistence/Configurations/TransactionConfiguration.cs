using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Shva.Domain.Entities;

namespace Shva.Infrastructure.Persistence.Configurations;

/// <summary>EF Core mapping for <see cref="Transaction"/>.</summary>
public sealed class TransactionConfiguration : IEntityTypeConfiguration<Transaction>
{
    public void Configure(EntityTypeBuilder<Transaction> builder)
    {
        builder.ToTable("Transactions");
        builder.HasKey(t => t.Id);

        builder.Property(t => t.RegionKey).IsRequired().HasMaxLength(8);
        builder.Property(t => t.RegionName).IsRequired().HasMaxLength(64);

        // Persist the enum as its readable name so the table is self-describing.
        builder.Property(t => t.Status)
            .IsRequired()
            .HasConversion<string>()
            .HasMaxLength(16);

        builder.Property(t => t.LocalTimeAtRegion).HasColumnType("datetime2");
        builder.Property(t => t.SubmittedAtUtc).IsRequired();
        builder.Property(t => t.CreatedAtUtc).IsRequired();

        // Optimizes the "most recent approved transactions" query that powers the UI cards.
        builder.HasIndex(t => new { t.Status, t.CreatedAtUtc });

        builder.HasOne(t => t.User)
            .WithMany(u => u.Transactions)
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
