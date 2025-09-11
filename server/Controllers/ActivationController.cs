using Microsoft.AspNetCore.Mvc;
using Logic.Interfaces;
using Shared.Models;
using Shared.Models.Requests;

namespace App.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivationController : ControllerBase
{
    private readonly IActivationLogic _activationLogic;

    public ActivationController(IActivationLogic activationLogic)
    {
        _activationLogic = activationLogic;
    }

    [HttpGet("status")]
    public async Task<ActionResult<ActivationResponse>> GetActivationStatus()
    {
        try
        {
            var result = await _activationLogic.CheckActivationAsync();
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ActivationResponse
            {
                Success = false,
                Message = $"Internal server error: {ex.Message}"
            });
        }
    }

    [HttpPost("save")]
    public async Task<ActionResult<ActivationResponse>> SaveActivationStatus([FromBody] ActivationStatus activationStatus)
    {
        try
        {
            if (activationStatus == null)
            {
                return BadRequest(new ActivationResponse
                {
                    Success = false,
                    Message = "Invalid activation data"
                });
            }

            var result = await _activationLogic.SaveActivationStatusAsync(activationStatus);
            
            if (result)
            {
                return Ok(new ActivationResponse
                {
                    Success = true,
                    Message = "Activation status saved successfully",
                    ActivatedAt = activationStatus.ActivatedAt
                });
            }

            return StatusCode(500, new ActivationResponse
            {
                Success = false,
                Message = "Failed to save activation status"
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ActivationResponse
            {
                Success = false,
                Message = $"Internal server error: {ex.Message}"
            });
        }
    }

    [HttpDelete("reset")]
    public async Task<ActionResult<ActivationResponse>> ResetActivation()
    {
        try
        {
            var result = await _activationLogic.ResetActivationAsync();
            
            if (result)
            {
                return Ok(new ActivationResponse
                {
                    Success = true,
                    Message = "Activation reset successfully"
                });
            }

            return StatusCode(500, new ActivationResponse
            {
                Success = false,
                Message = "Failed to reset activation"
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ActivationResponse
            {
                Success = false,
                Message = $"Internal server error: {ex.Message}"
            });
        }
    }
}