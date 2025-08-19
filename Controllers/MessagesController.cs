using Microsoft.AspNetCore.Mvc;

namespace ElectronApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessagesController : ControllerBase
{
    private readonly DatabaseService _databaseService;

    public MessagesController(DatabaseService databaseService)
    {
        _databaseService = databaseService;
    }

    [HttpGet]
    public ActionResult<List<MessageRecord>> GetMessages()
    {
        try
        {
            var messages = _databaseService.GetMessages();
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

            _databaseService.SaveMessage(request.Message);
            return Ok(new { success = true, message = "Message saved successfully" });
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
