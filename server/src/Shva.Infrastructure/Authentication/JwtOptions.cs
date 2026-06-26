using System.ComponentModel.DataAnnotations;

namespace Shva.Infrastructure.Authentication;

/// <summary>
/// Strongly-typed JWT settings bound from the "Jwt" configuration section.
/// </summary>
public sealed class JwtOptions
{
    /// <summary>Configuration section name.</summary>
    public const string SectionName = "Jwt";

    /// <summary>Token issuer (the API).</summary>
    [Required]
    public string Issuer { get; set; } = default!;

    /// <summary>Intended token audience (the client).</summary>
    [Required]
    public string Audience { get; set; } = default!;

    /// <summary>Symmetric signing key. Keep this secret; supply via configuration/secrets in production.</summary>
    [Required]
    [MinLength(32)]
    public string Key { get; set; } = default!;

    /// <summary>Token lifetime in minutes.</summary>
    [Range(1, 1440)]
    public int ExpiryMinutes { get; set; } = 120;
}
