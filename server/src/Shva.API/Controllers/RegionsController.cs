using Microsoft.AspNetCore.Mvc;
using Shva.Application.Regions.Dtos;
using Shva.Domain.Regions;

namespace Shva.API.Controllers;

/// <summary>Exposes the supported regions so the client can populate its selector.</summary>
[ApiController]
[Route("api/regions")]
[Produces("application/json")]
public sealed class RegionsController : ControllerBase
{
    /// <summary>Returns all supported regions and their time zones.</summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<RegionDto>), StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<RegionDto>> GetAll() =>
        Ok(RegionCatalog.All.Select(r => new RegionDto(r.Key, r.DisplayName, r.IanaTimeZoneId)));
}
