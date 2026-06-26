namespace Shva.Domain.Regions;

/// <summary>
/// A supported region (country) whose banking hours are evaluated in its own local time zone.
/// </summary>
/// <param name="Key">Stable, language-neutral identifier persisted with each transaction (e.g. "IL").</param>
/// <param name="DisplayName">Human-readable name (e.g. "Israel").</param>
/// <param name="IanaTimeZoneId">
/// IANA time zone identifier (e.g. "Asia/Jerusalem"). IANA ids are used rather than Windows ids so the
/// same code resolves correctly on Windows and Linux (.NET relies on ICU for cross-platform tz data).
/// </param>
public sealed record Region(string Key, string DisplayName, string IanaTimeZoneId);
