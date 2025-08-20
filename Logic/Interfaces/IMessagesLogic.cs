using Persistence.Models;

namespace Logic.Interfaces;

public interface IMessagesLogic
{
    void SaveMessage(string message);
    List<MessageRecord> GetMessages();
}
