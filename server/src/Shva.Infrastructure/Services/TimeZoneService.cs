using Shva.Application.Common.Interfaces;

namespace Shva.Infrastructure.Services;

/// <summary>
/// <see cref="ITimeZoneService"/> backed by <see cref="TimeZoneInfo"/>. Since .NET 6, IANA ids
/// resolve on Windows and Linux alike (ICU provides the mapping), so the same code is portable.
/// </summary>
public sealed class TimeZoneService : ITimeZoneService
{
    public DateTime ConvertUtcToLocal(DateTimeOffset utcInstant, string ianaTimeZoneId)
    {
        var timeZone = TimeZoneInfo.FindSystemTimeZoneById(ianaTimeZoneId);
        return TimeZoneInfo.ConvertTime(utcInstant, timeZone).DateTime;
    }
}
