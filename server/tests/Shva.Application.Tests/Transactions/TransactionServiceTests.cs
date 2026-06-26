using System.Globalization;
using FluentValidation;
using Shva.Application.Tests.TestDoubles;
using Shva.Application.Transactions;
using Shva.Application.Transactions.Dtos;
using Shva.Application.Transactions.Validators;
using Shva.Domain.Enums;
using Shva.Infrastructure.Services;

namespace Shva.Application.Tests.Transactions;

/// <summary>
/// Tests the end-to-end approval pipeline using the *real* time-zone service, so the IANA
/// conversions and DST handling are exercised for every region.
/// </summary>
public sealed class TransactionServiceTests
{
    private static readonly DateTimeOffset FixedNow =
        new(2026, 6, 25, 12, 0, 0, TimeSpan.Zero);

    private static (TransactionService Service, FakeTransactionRepository Repo) CreateService()
    {
        var repo = new FakeTransactionRepository();
        var service = new TransactionService(
            new SimulateTransactionRequestValidator(),
            new TimeZoneService(),
            repo,
            new FixedClock(FixedNow));
        return (service, repo);
    }

    private static DateTimeOffset Utc(string iso) =>
        DateTimeOffset.Parse(iso, CultureInfo.InvariantCulture, DateTimeStyles.AdjustToUniversal);

    [Theory]
    // Israel — summer (Asia/Jerusalem, UTC+3): window maps to 05:00–15:00 UTC
    [InlineData("IL", "2026-06-25T04:59:00Z", "Rejected")]
    [InlineData("IL", "2026-06-25T05:00:00Z", "Approved")]
    [InlineData("IL", "2026-06-25T14:59:00Z", "Approved")]
    [InlineData("IL", "2026-06-25T15:00:00Z", "Rejected")]
    // Israel — winter (UTC+2): window shifts to 06:00–16:00 UTC, proving DST is applied
    [InlineData("IL", "2026-01-15T05:59:00Z", "Rejected")]
    [InlineData("IL", "2026-01-15T06:00:00Z", "Approved")]
    // France — summer (Europe/Paris, UTC+2)
    [InlineData("FR", "2026-06-25T05:59:00Z", "Rejected")]
    [InlineData("FR", "2026-06-25T06:00:00Z", "Approved")]
    // France — winter (UTC+1)
    [InlineData("FR", "2026-01-15T07:00:00Z", "Approved")]
    // USA Eastern — summer (America/New_York, UTC-4)
    [InlineData("US", "2026-06-25T11:59:00Z", "Rejected")]
    [InlineData("US", "2026-06-25T12:00:00Z", "Approved")]
    [InlineData("US", "2026-06-25T21:59:00Z", "Approved")]
    [InlineData("US", "2026-06-25T22:00:00Z", "Rejected")]
    // USA Eastern — winter (UTC-5)
    [InlineData("US", "2026-01-15T13:00:00Z", "Approved")]
    // Cyprus — summer (Asia/Nicosia, UTC+3)
    [InlineData("CY", "2026-06-25T04:59:00Z", "Rejected")]
    [InlineData("CY", "2026-06-25T05:00:00Z", "Approved")]
    // Italy — summer (Europe/Rome, UTC+2)
    [InlineData("IT", "2026-06-25T05:59:00Z", "Rejected")]
    [InlineData("IT", "2026-06-25T06:00:00Z", "Approved")]
    // Japan (Asia/Tokyo, UTC+9, no DST)
    [InlineData("JP", "2026-06-24T22:59:00Z", "Rejected")]
    [InlineData("JP", "2026-06-24T23:00:00Z", "Approved")]
    [InlineData("JP", "2026-06-25T09:00:00Z", "Rejected")]
    public async Task SimulateAsync_EvaluatesBankingHoursPerRegion(string region, string utc, string expectedStatus)
    {
        var (service, _) = CreateService();

        var result = await service.SimulateAsync(
            new SimulateTransactionRequest { Region = region, Timestamp = Utc(utc) }, userId: null);

        Assert.Equal(expectedStatus, result.Status);
    }

    [Fact]
    public async Task SimulateAsync_PersistsRejectedTransactions()
    {
        var (service, repo) = CreateService();

        await service.SimulateAsync(
            new SimulateTransactionRequest { Region = "IL", Timestamp = Utc("2026-06-25T20:00:00Z") }, userId: null);

        var saved = Assert.Single(repo.Saved);
        Assert.Equal(TransactionStatus.Rejected, saved.Status);
    }

    [Fact]
    public async Task SimulateAsync_AppliesDaylightSavingToLocalTime()
    {
        var (service, _) = CreateService();

        // Same UTC wall-clock instant, six months apart → different Israeli local hour (DST).
        var summer = await service.SimulateAsync(
            new SimulateTransactionRequest { Region = "IL", Timestamp = Utc("2026-06-25T05:00:00Z") }, null);
        var winter = await service.SimulateAsync(
            new SimulateTransactionRequest { Region = "IL", Timestamp = Utc("2026-01-15T05:00:00Z") }, null);

        Assert.Equal(8, summer.LocalTimeAtRegion.Hour);  // UTC+3
        Assert.Equal(7, winter.LocalTimeAtRegion.Hour);  // UTC+2
    }

    [Fact]
    public async Task SimulateAsync_RejectsUnsupportedRegion()
    {
        var (service, _) = CreateService();

        await Assert.ThrowsAsync<ValidationException>(() => service.SimulateAsync(
            new SimulateTransactionRequest { Region = "ZZ", Timestamp = Utc("2026-06-25T10:00:00Z") }, null));
    }

    [Fact]
    public async Task GetApprovedAsync_ReturnsOnlyApproved_NewestFirst()
    {
        var (service, _) = CreateService();

        await service.SimulateAsync(new SimulateTransactionRequest { Region = "JP", Timestamp = Utc("2026-06-25T01:00:00Z") }, null); // approved
        await service.SimulateAsync(new SimulateTransactionRequest { Region = "JP", Timestamp = Utc("2026-06-25T12:00:00Z") }, null); // rejected (21:00 local)

        var approved = await service.GetApprovedAsync(limit: 20);

        Assert.Single(approved);
        Assert.Equal("JP", approved[0].Region);
    }
}
