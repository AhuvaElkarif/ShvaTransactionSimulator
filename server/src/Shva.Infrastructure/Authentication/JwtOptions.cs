using System.ComponentModel.DataAnnotations;

namespace Shva.Infrastructure.Authentication;

/// <summary>
/// Strongly-typed JWT settings bound from the "Jwt" configuration section.
/// </summary>
public sealed class JwtOptions
{
    public const string SectionName = "Jwt";

    [Required]
    public string Issuer { get; set; } = default!;

    [Required]
    public string Audience { get; set; } = default!;

    [Required]
    [MinLength(32)]
    public string Key { get; set; } = default!;

    [Range(1, 1440)]
    public int ExpiryMinutes { get; set; } = 120;
}
