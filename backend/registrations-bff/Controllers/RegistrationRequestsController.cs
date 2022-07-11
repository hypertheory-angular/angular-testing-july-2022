using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RegistrationsBff;
namespace registrations_bff.Controllers;

public class RegistrationRequestsController : ControllerBase
{
    [HttpPost("/offerings/{offeringId}/registration-requests")]
    [Authorize]
    public async Task<ActionResult> AddRequest(string offeringId, [FromBody] RegistrationRequestModel request)
    {
        var response = new RegistrationRequestResponseModel
        {
            UserSub = User.GetSub()!,
            AgreesToParticipate = request.AgreesToParticipate,
            AgreesToPayment = request.AgreesToPayment,
            Amount = request.Amount,
            Comments = request.Comments,
        };
        return Ok(response);
    }
}

public record RegistrationRequestModel
{
    public bool AgreesToPayment { get; init; }
    public bool AgreesToParticipate { get; init; }
    public decimal Amount { get; init; }
    public string? Comments { get; init; }
}

public record RegistrationRequestResponseModel
{
    public string Id { get; init; } = Guid.NewGuid().ToString();
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
    public string UserSub { get; set; } = string.Empty;
    public bool AgreesToPayment { get; init; }
    public bool AgreesToParticipate { get; init; }
    public decimal Amount { get; init; }
    public string? Comments { get; init; }
}