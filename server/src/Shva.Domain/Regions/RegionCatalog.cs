namespace Shva.Domain.Regions;

/// <summary>
/// The fixed set of regions supported by the Transaction Approval Simulator.
/// Acts as the single source of truth for region keys and their time zones.
/// </summary>
public static class RegionCatalog
{
    /// <summary>France — Europe/Paris (observes DST).</summary>
    public static readonly Region France = new("FR", "France", "Europe/Paris");

    /// <summary>Israel — Asia/Jerusalem (observes DST).</summary>
    public static readonly Region Israel = new("IL", "Israel", "Asia/Jerusalem");

    /// <summary>Cyprus — Asia/Nicosia (observes DST).</summary>
    public static readonly Region Cyprus = new("CY", "Cyprus", "Asia/Nicosia");

    /// <summary>Italy — Europe/Rome (observes DST).</summary>
    public static readonly Region Italy = new("IT", "Italy", "Europe/Rome");

    /// <summary>
    /// United States — represented by America/New_York (Eastern Time).
    /// The US spans multiple zones; Eastern is used as the canonical reference for this simulator.
    /// </summary>
    public static readonly Region UnitedStates = new("US", "United States", "America/New_York");

    /// <summary>Japan — Asia/Tokyo (no DST).</summary>
    public static readonly Region Japan = new("JP", "Japan", "Asia/Tokyo");

    /// <summary>All supported regions, in display order.</summary>
    public static readonly IReadOnlyList<Region> All = new[]
    {
        France,
        Israel,
        Cyprus,
        Italy,
        UnitedStates,
        Japan
    };

    /// <summary>
    /// Finds a region by its key (case-insensitive). Returns <c>null</c> when the key is unknown.
    /// </summary>
    public static Region? Find(string? key) =>
        All.FirstOrDefault(r => string.Equals(r.Key, key, StringComparison.OrdinalIgnoreCase));

    /// <summary>Indicates whether the supplied key maps to a supported region.</summary>
    public static bool IsSupported(string? key) => Find(key) is not null;
}
