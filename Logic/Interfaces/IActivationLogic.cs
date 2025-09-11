using Shared.Models;
using Shared.Models.Requests;

namespace Logic.Interfaces
{
    public interface IActivationLogic
    {
        Task<ActivationStatus?> GetActivationStatusAsync();
        Task<ActivationResponse> CheckActivationAsync();
        Task<bool> SaveActivationStatusAsync(ActivationStatus activationStatus);
        Task<bool> ResetActivationAsync();
    }
}