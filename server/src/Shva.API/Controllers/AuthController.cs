using Microsoft.AspNetCore.Mvc;
using Shva.Application.Auth;
using Shva.Application.Auth.Dtos;

namespace Shva.API.Controllers;

/// <summary>Registration and login endpoints.</summary>
[ApiController]
[Route("api/auth")]
[Produces("application/json")]
public sealed class AuthController(IAuthService authService) : ControllerBase
{
    /// <summary>Registers a new user and returns a bearer token.</summary>
    [HttpPost("signup")]
    [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<AuthResponse>> Signup(
        [FromBody] SignupRequest request, CancellationToken cancellationToken)
        => Ok(await authService.SignupAsync(request, cancellationToken));

    /// <summary>Authenticates a user and returns a bearer token.</summary>
    [HttpPost("login")]
    [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<AuthResponse>> Login(
        [FromBody] LoginRequest request, CancellationToken cancellationToken)
        => Ok(await authService.LoginAsync(request, cancellationToken));
}
