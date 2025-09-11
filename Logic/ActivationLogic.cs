using Logic.Interfaces;
using Persistence.Interfaces;
using Shared.Models;
using Shared.Models.Requests;

namespace Logic;

public class ActivationLogic : IActivationLogic
{
    private readonly IActivationPersistence _activationPersistence;

    public ActivationLogic(IActivationPersistence activationPersistence)
    {
        _activationPersistence = activationPersistence;
    }

    public async Task<ActivationStatus?> GetActivationStatusAsync()
    {
        try
        {
            return await _activationPersistence.GetActivationStatusAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error getting activation status: {ex.Message}");
            return null;
        }
    }

    public async Task<ActivationResponse> CheckActivationAsync()
    {
        try
        {
            var activationStatus = await _activationPersistence.GetActivationStatusAsync();
            
            if (activationStatus?.IsActivated == true)
            {
                return new ActivationResponse
                {
                    Success = true,
                    Message = "Application is activated",
                    ActivatedAt = activationStatus.ActivatedAt
                };
            }

            return new ActivationResponse
            {
                Success = false,
                Message = "Application is not activated"
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error checking activation status: {ex.Message}");
            return new ActivationResponse
            {
                Success = false,
                Message = $"Error checking activation status: {ex.Message}"
            };
        }
    }

    public async Task<bool> SaveActivationStatusAsync(ActivationStatus activationStatus)
    {
        try
        {
            return await _activationPersistence.SaveActivationStatusAsync(activationStatus);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error saving activation status: {ex.Message}");
            return false;
        }
    }

    public async Task<bool> ResetActivationAsync()
    {
        try
        {
            return await _activationPersistence.DeleteActivationStatusAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error resetting activation: {ex.Message}");
            return false;
        }
    }
}