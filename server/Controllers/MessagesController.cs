using Microsoft.AspNetCore.Mvc;
using Logic;
using Persistence.Models;

namespace ElectronApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessagesController : ControllerBase
{
    private readonly MessagesLogic _messagesLogic;

    public MessagesController(MessagesLogic messagesLogic)
    {
        _messagesLogic = messagesLogic;
    }

    [HttpGet]
    public ActionResult<List<MessageRecord>> GetMessages()
    {
        try
        {
            var messages = _messagesLogic.GetMessages();
            return Ok(messages);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }

    [HttpPost]
    public ActionResult SaveMessage([FromBody] SaveMessageRequest request)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest(new { error = "Message cannot be empty" });
            }

            _messagesLogic.SaveMessage(request.Message);
            return Ok(new { success = true, message = "Message saved successfully" });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }
}

public class SaveMessageRequest
{
    public string Message { get; set; } = string.Empty;
}
