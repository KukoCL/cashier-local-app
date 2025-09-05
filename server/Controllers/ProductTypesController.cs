using Microsoft.AspNetCore.Mvc;
using Shared.Constants;

namespace App.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductTypesController : ControllerBase
{
    /// <summary>
    /// Get all available product types
    /// </summary>
    /// <returns>List of product types</returns>
    [HttpGet]
    public ActionResult<string[]> GetProductTypes()
    {
        return Ok(ProductTypes.AllTypes);
    }
}
