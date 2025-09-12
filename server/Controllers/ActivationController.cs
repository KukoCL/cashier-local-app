using Microsoft.AspNetCore.Mvc;
using App.Services;

namespace App.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivationController : ControllerBase
{
    private readonly ILicenseService _licenseService;
    private readonly ILogger<ActivationController> _logger;

    public ActivationController(ILicenseService licenseService, ILogger<ActivationController> logger)
    {
        _licenseService = licenseService;
        _logger = logger;
    }

    [HttpPost("activate")]
    public async Task<IActionResult> ActivateAsync([FromBody] ActivationRequest request)
    {
        try
        {
            // TODO: Send request to AWS Lambda for validation
            // For now, simulate a successful response with expiration date
            
            // Mock validation - replace with actual Lambda call
            if (string.IsNullOrWhiteSpace(request.ActivationKey))
            {
                return BadRequest(new { success = false, message = "Clave de activación requerida" });
            }

            // Mock response from Lambda - replace with actual call
            var expirationDate = DateTime.UtcNow.AddYears(1); // 1 year license
            
            // Save license file locally
            var success = await _licenseService.SaveLicenseAsync(
                request.ActivationKey, 
                request.ComputerFingerprint, 
                expirationDate
            );

            if (!success)
            {
                return StatusCode(500, new { success = false, message = "Error al guardar la licencia" });
            }

            return Ok(new ActivationResponse
            {
                Success = true,
                Message = "Aplicación activada exitosamente",
                ActivatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                ExpirationDate = expirationDate.ToString("yyyy-MM-ddTHH:mm:ssZ")
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during activation");
            return StatusCode(500, new { success = false, message = "Error interno del servidor" });
        }
    }

    [HttpGet("status")]
    public async Task<IActionResult> GetActivationStatusAsync()
    {
        try
        {
            var isValid = await _licenseService.IsLicenseValidAsync();
            var license = await _licenseService.GetLicenseAsync();

            return Ok(new ActivationStatusResponse
            {
                IsActivated = isValid,
                ActivationKey = license?.ActivationKey,
                ActivatedAt = license?.ActivatedAt.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                ExpirationDate = license?.ExpirationDate.ToString("yyyy-MM-ddTHH:mm:ssZ"),
                ComputerFingerprint = license?.ComputerFingerprint
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking activation status");
            return StatusCode(500, new { success = false, message = "Error al verificar el estado de activación" });
        }
    }

    [HttpDelete("deactivate")]
    public async Task<IActionResult> DeactivateAsync()
    {
        try
        {
            await _licenseService.DeleteLicenseAsync();
            return Ok(new { success = true, message = "Aplicación desactivada exitosamente" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during deactivation");
            return StatusCode(500, new { success = false, message = "Error al desactivar la aplicación" });
        }
    }
}

public class ActivationRequest
{
    public string ActivationKey { get; set; } = string.Empty;
    public string ComputerFingerprint { get; set; } = string.Empty;
}

public class ActivationResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public string ActivatedAt { get; set; } = string.Empty;
    public string ExpirationDate { get; set; } = string.Empty;
}

public class ActivationStatusResponse
{
    public bool IsActivated { get; set; }
    public string? ActivationKey { get; set; }
    public string? ActivatedAt { get; set; }
    public string? ExpirationDate { get; set; }
    public string? ComputerFingerprint { get; set; }
}