namespace Shva.Application.Common.Interfaces;

/// <summary>
/// Converts absolute instants into the local wall-clock time of a given time zone.
/// Implemented in Infrastructure (depends on the OS/ICU time zone database).
/// </summary>
public interface ITimeZoneService
{
    /// <summary>
    /// Returns the wall-clock local time in <paramref name="ianaTimeZoneId"/> at the moment
    /// described by <paramref name="utcInstant"/>. DST is applied automatically.
    /// </summary>
    /// <param name="utcInstant">An absolute instant (will be treated as UTC).</param>
    /// <param name="ianaTimeZoneId">An IANA time zone id, e.g. "Asia/Jerusalem".</param>
    DateTime ConvertUtcToLocal(DateTimeOffset utcInstant, string ianaTimeZoneId);
}
