using Shva.Domain.Banking;

namespace Shva.Application.Tests.Domain;

/// <summary>
/// Unit tests for the pure banking-hours rule. The window is [08:00, 18:00): open inclusive,
/// close exclusive.
/// </summary>
public sealed class BankingHoursTests
{
    [Theory]
    [InlineData(7, 59, false)]
    [InlineData(8, 0, true)]   // open boundary is inclusive
    [InlineData(12, 0, true)]
    [InlineData(17, 59, true)]
    [InlineData(18, 0, false)] // close boundary is exclusive
    [InlineData(18, 1, false)]
    [InlineData(0, 0, false)]
    [InlineData(23, 59, false)]
    public void Contains_ReturnsExpected_ForStandardHours(int hour, int minute, bool expected)
    {
        var result = BankingHours.Standard.Contains(new TimeOnly(hour, minute));
        Assert.Equal(expected, result);
    }
}
