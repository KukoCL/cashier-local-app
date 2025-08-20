namespace Persistence.Models;

public class MessageRecord
{
    public Guid Id { get; set; }
    public string Message { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
}
