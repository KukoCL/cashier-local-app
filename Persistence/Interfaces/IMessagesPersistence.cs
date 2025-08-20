using Persistence.Models;

namespace Persistence.Interfaces;

public interface IMessagesPersistence
{
    void SaveMessage(string message);
    List<MessageRecord> GetMessages();
}
