namespace Shared.Models
{
    public class ActivationStatus
    {
        public string Id { get; set; } = string.Empty;
        public bool IsActivated { get; set; }
        public string? ActivationKey { get; set; }
        public DateTime? ActivatedAt { get; set; }
        public string? ComputerFingerprint { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastUpdatedAt { get; set; } = DateTime.UtcNow;
    }
}