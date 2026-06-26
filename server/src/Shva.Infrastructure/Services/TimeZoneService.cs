using Shva.Application.Common.Interfaces;

namespace Shva.Infrastructure.Services;

/// <summary>
/// <see cref="ITimeZoneService"/> backed by <see cref="TimeZoneInfo"/>. Since .NET 6, IANA ids
/// resolve on Windows and Linux alike (ICU provides the mapping), so the same code is portable.
/// </summary>
public sealed class TimeZoneService : ITimeZoneService
{
    /// <inheritdoc />
    public DateTime ConvertUtcToLocal(DateTimeOffset utcInstant, string ianaTimeZoneId)
    {
        var timeZone = TimeZoneInfo.FindSystemTimeZoneById(ianaTimeZoneId);
        // ConvertTime on a DateTimeOffset yields the offset in the target zone; .DateTime is the
        // wall-clock local time (DST already applied), which the banking-hours rule evaluates.
        return TimeZoneInfo.ConvertTime(utcInstant, timeZone).DateTime;
    }
}
