using Microsoft.AspNetCore.Mvc;
using System.Net.NetworkInformation;
using System.Security.Cryptography;
using System.Text;

namespace App.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FingerprintController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetComputerFingerprint()
        {
            try
            {
                var fingerprintData = GenerateComputerFingerprint();
                return Ok(new { fingerprint = fingerprintData });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        private string GenerateComputerFingerprint()
        {
            // Get MAC address
            var macAddress = GetMacAddress();
            
            // Get CPU information
            var cpuInfo = GetCpuInfo();
            
            // Combine MAC address and CPU info
            var fingerprintData = $"{macAddress}|{cpuInfo}|{Environment.OSVersion.Platform}";
            
            // Generate hash
            var hash = GenerateHash(fingerprintData);
            
            return hash;
        }

        private string GetMacAddress()
        {
            try
            {
                var networkInterfaces = NetworkInterface.GetAllNetworkInterfaces();
                
                foreach (var networkInterface in networkInterfaces)
                {
                    // Skip loopback and non-operational interfaces
                    if (networkInterface.NetworkInterfaceType == NetworkInterfaceType.Loopback ||
                        networkInterface.OperationalStatus != OperationalStatus.Up)
                        continue;
                    
                    var macAddress = networkInterface.GetPhysicalAddress().ToString();
                    if (!string.IsNullOrEmpty(macAddress) && macAddress != "000000000000")
                    {
                        // Format MAC address with colons
                        return string.Join(":", Enumerable.Range(0, macAddress.Length / 2)
                            .Select(i => macAddress.Substring(i * 2, 2)));
                    }
                }
                
                return "unknown";
            }
            catch
            {
                return "unknown";
            }
        }

        private string GetCpuInfo()
        {
            try
            {
                // Get processor information from environment
                var processorCount = Environment.ProcessorCount;
                var machineName = Environment.MachineName;
                
                // Combine processor info
                return $"{machineName}-{processorCount}cores";
            }
            catch
            {
                return "unknown";
            }
        }

        private string GenerateHash(string data)
        {
            using var sha256 = SHA256.Create();
            var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(data));
            return Convert.ToHexString(hashBytes).ToLowerInvariant();
        }
    }
}
