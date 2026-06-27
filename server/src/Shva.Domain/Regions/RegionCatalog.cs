namespace Shva.Domain.Regions;

/// <summary>
/// The fixed set of regions supported by the Transaction Approval Simulator.
/// Acts as the single source of truth for region keys and their time zones.
/// </summary>
public static class RegionCatalog
{
    public static readonly Region France = new("FR", "France", "Europe/Paris");

    public static readonly Region Israel = new("IL", "Israel", "Asia/Jerusalem");

    public static readonly Region Cyprus = new("CY", "Cyprus", "Asia/Nicosia");

    public static readonly Region Italy = new("IT", "Italy", "Europe/Rome");

    public static readonly Region UnitedStates = new("US", "United States", "America/New_York");

    public static readonly Region Japan = new("JP", "Japan", "Asia/Tokyo");

    public static readonly IReadOnlyList<Region> All = new[]
    {
        France,
        Israel,
        Cyprus,
        Italy,
        UnitedStates,
        Japan
    };

    public static Region? Find(string? key) =>
        All.FirstOrDefault(r => string.Equals(r.Key, key, StringComparison.OrdinalIgnoreCase));

    public static bool IsSupported(string? key) => Find(key) is not null;
}
