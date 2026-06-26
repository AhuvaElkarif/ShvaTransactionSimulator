namespace Shva.Application.Regions.Dtos;

/// <summary>
/// A region exposed to the client to populate the region selector.
/// </summary>
/// <param name="Key">Language-neutral region key (e.g. "IL").</param>
/// <param name="Name">Display name (e.g. "Israel").</param>
/// <param name="TimeZoneId">IANA time zone id used for the banking-hours evaluation.</param>
public sealed record RegionDto(string Key, string Name, string TimeZoneId);
