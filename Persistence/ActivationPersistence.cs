using LiteDB;
using Shared.Models;
using Shared.Constants;
using Persistence.Interfaces;

namespace Persistence;

public class ActivationPersistence : IActivationPersistence
{
    private readonly string _dbPath;
    private const string ActivationCollectionName = "activation";

    public ActivationPersistence(string? dbPath = null)
    {
        _dbPath = dbPath ?? DatabaseConstants.DefaultDatabaseFileName;
    }

    public async Task<ActivationStatus?> GetActivationStatusAsync()
    {
        return await Task.Run(() =>
        {
            using var db = new LiteDatabase(_dbPath);
            var activationCollection = db.GetCollection<ActivationStatus>(ActivationCollectionName);
            return activationCollection.FindAll().FirstOrDefault();
        });
    }

    public async Task<bool> SaveActivationStatusAsync(ActivationStatus activationStatus)
    {
        return await Task.Run(() =>
        {
            try
            {
                using var db = new LiteDatabase(_dbPath);
                var activationCollection = db.GetCollection<ActivationStatus>(ActivationCollectionName);
                
                // Ensure there's only one activation record
                activationCollection.DeleteAll();
                
                activationStatus.Id = Guid.NewGuid().ToString();
                activationStatus.CreatedAt = DateTime.UtcNow;
                activationStatus.LastUpdatedAt = DateTime.UtcNow;
                
                activationCollection.Insert(activationStatus);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving activation status: {ex.Message}");
                return false;
            }
        });
    }

    public async Task<bool> UpdateActivationStatusAsync(ActivationStatus activationStatus)
    {
        return await Task.Run(() =>
        {
            try
            {
                using var db = new LiteDatabase(_dbPath);
                var activationCollection = db.GetCollection<ActivationStatus>(ActivationCollectionName);
                
                activationStatus.LastUpdatedAt = DateTime.UtcNow;
                return activationCollection.Update(activationStatus);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating activation status: {ex.Message}");
                return false;
            }
        });
    }

    public async Task<bool> DeleteActivationStatusAsync()
    {
        return await Task.Run(() =>
        {
            try
            {
                using var db = new LiteDatabase(_dbPath);
                var activationCollection = db.GetCollection<ActivationStatus>(ActivationCollectionName);
                activationCollection.DeleteAll();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting activation status: {ex.Message}");
                return false;
            }
        });
    }
}