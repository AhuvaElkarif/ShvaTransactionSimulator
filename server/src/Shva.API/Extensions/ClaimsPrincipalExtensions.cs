using System.Security.Claims;

namespace Shva.API.Extensions;

/// <summary>Convenience accessors over the authenticated principal.</summary>
public static class ClaimsPrincipalExtensions
{
    /// <summary>
    /// Returns the authenticated user's id (from the JWT <c>sub</c> claim), or <c>null</c> when the
    /// request is anonymous. Lets endpoints attribute a submission to a user when a token is present
    /// without forcing authentication.
    /// </summary>
    public static Guid? GetUserId(this ClaimsPrincipal principal)
    {
        var value = principal.FindFirstValue(ClaimTypes.NameIdentifier)
                    ?? principal.FindFirstValue("sub");
        return Guid.TryParse(value, out var id) ? id : null;
    }
}
