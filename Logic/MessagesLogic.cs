using Persistence.Interfaces;
using Persistence.Models;
using Logic.Interfaces;

namespace Logic;

public class MessagesLogic : IMessagesLogic
{
    private readonly IMessagesPersistence _messagesPersistence;

    public MessagesLogic(IMessagesPersistence messagesPersistence)
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
