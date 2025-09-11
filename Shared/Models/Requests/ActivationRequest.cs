namespace Shared.Models.Requests
{
    public class ActivationRequest
    {
        public string ActivationKey { get; set; } = string.Empty;
        public string ComputerFingerprint { get; set; } = string.Empty;
    }

    public class ActivationResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public DateTime? ActivatedAt { get; set; }
    }
}