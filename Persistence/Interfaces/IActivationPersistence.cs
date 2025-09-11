using Shared.Models;

namespace Persistence.Interfaces
{
    public interface IActivationPersistence
    {
        Task<ActivationStatus?> GetActivationStatusAsync();
        Task<bool> SaveActivationStatusAsync(ActivationStatus activationStatus);
        Task<bool> UpdateActivationStatusAsync(ActivationStatus activationStatus);
        Task<bool> DeleteActivationStatusAsync();
    }
}