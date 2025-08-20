using Persistence;
using Persistence.Models;

namespace Logic;

public class MessagesLogic
{
    private readonly MessagesPersistence _messagesPersistence;

    public MessagesLogic(MessagesPersistence messagesPersistence)
    {
        _messagesPersistence = messagesPersistence;
    }

    public void SaveMessage(string message)
    {
        if (string.IsNullOrWhiteSpace(message))
        {
            throw new ArgumentException("Message cannot be empty or whitespace.", nameof(message));
        }

        _messagesPersistence.SaveMessage(message);
    }

    public List<MessageRecord> GetMessages()
    {
        return _messagesPersistence.GetMessages();
    }
}
