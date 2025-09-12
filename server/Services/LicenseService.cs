using System.Text.Json;

namespace App.Services
{
    public interface ILicenseService
    {
        Task<bool> SaveLicenseAsync(string activationKey, string computerFingerprint, DateTime expirationDate);
        Task<LicenseInfo?> GetLicenseAsync();
        Task<bool> IsLicenseValidAsync();
        Task DeleteLicenseAsync();
    }

    public class LicenseInfo
    {
        public string ActivationKey { get; set; } = string.Empty;
        public string ComputerFingerprint { get; set; } = string.Empty;
        public DateTime ActivatedAt { get; set; }
        public DateTime ExpirationDate { get; set; }
    }

    public class LicenseService : ILicenseService
    {
        private readonly string _licenseFilePath;
        private readonly ILogger<LicenseService> _logger;

        public LicenseService(ILogger<LicenseService> logger)
        {
            _logger = logger;
            // Store license file in application data folder
            var appDataPath = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
            var appFolder = Path.Combine(appDataPath, "CashierLocalApp");
            Directory.CreateDirectory(appFolder);
            _licenseFilePath = Path.Combine(appFolder, "license.dat");
        }

        public async Task<bool> SaveLicenseAsync(string activationKey, string computerFingerprint, DateTime expirationDate)
        {
            try
            {
                var licenseInfo = new LicenseInfo
                {
                    ActivationKey = activationKey,
                    ComputerFingerprint = computerFingerprint,
                    ActivatedAt = DateTime.UtcNow,
                    ExpirationDate = expirationDate
                };

                var jsonContent = JsonSerializer.Serialize(licenseInfo, new JsonSerializerOptions 
                { 
                    WriteIndented = true 
                });

                await File.WriteAllTextAsync(_licenseFilePath, jsonContent);
                _logger.LogInformation("License saved successfully");
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving license file");
                return false;
            }
        }

        public async Task<LicenseInfo?> GetLicenseAsync()
        {
            try
            {
                if (!File.Exists(_licenseFilePath))
                {
                    return null;
                }

                var jsonContent = await File.ReadAllTextAsync(_licenseFilePath);
                var licenseInfo = JsonSerializer.Deserialize<LicenseInfo>(jsonContent);
                
                return licenseInfo;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error reading license file");
                return null;
            }
        }

        public async Task<bool> IsLicenseValidAsync()
        {
            try
            {
                var license = await GetLicenseAsync();
                
                if (license == null)
                {
                    return false;
                }

                // Check if license has expired
                if (DateTime.UtcNow > license.ExpirationDate)
                {
                    _logger.LogWarning("License has expired");
                    return false;
                }

                // TODO: Add computer fingerprint validation
                // var currentFingerprint = await GetCurrentComputerFingerprint();
                // if (license.ComputerFingerprint != currentFingerprint)
                // {
                //     _logger.LogWarning("Computer fingerprint mismatch");
                //     return false;
                // }

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error validating license");
                return false;
            }
        }

        public Task DeleteLicenseAsync()
        {
            try
            {
                if (File.Exists(_licenseFilePath))
                {
                    File.Delete(_licenseFilePath);
                    _logger.LogInformation("License file deleted");
                }
                return Task.CompletedTask;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting license file");
                return Task.CompletedTask;
            }
        }
    }
}
