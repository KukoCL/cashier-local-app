using LiteDB;
using Persistence.Models;

namespace Persistence;

public class MessagesPersistence
{
    private readonly string _dbPath = "data.db";

    public void SaveMessage(string message)
    {
        using var db = new LiteDatabase(_dbPath);
        var messages = db.GetCollection<MessageRecord>("messages");
        
        messages.Insert(new MessageRecord
        {
            Id = Guid.NewGuid(),
            Message = message,
            Timestamp = DateTime.Now
        });
    }

    public List<MessageRecord> GetMessages()
    {
        using var db = new LiteDatabase(_dbPath);
        var messages = db.GetCollection<MessageRecord>("messages");
        return messages.FindAll().OrderByDescending(m => m.Timestamp).ToList();
    }
}
