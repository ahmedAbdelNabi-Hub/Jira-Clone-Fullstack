using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Presentation.Features.Invitations.Commands;
using System.Security.Claims;
using TaskifyAPI.Extensions;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvitationController : ControllerBase
    {
        private readonly ISender _mediator;
        public InvitationController(ISender mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("/api/v1/Invitation/send")]
        public async Task<IActionResult> SendInvitation([FromBody] SendInvitationCommand command)
        {
            var response = await _mediator.Send(command);
            return StatusCode(response.statusCode, response);
        }
        [Authorize]
        [HttpPost("/api/v1/invitation/accept")]
        public async Task<IActionResult> acceptInvitation([FromQuery] string token)
        {
            var userId = User.GetUserId();
            if (userId == null)
                return Unauthorized();

            var response = await _mediator.Send(new AcceptInvitationCommand() { Token = token, UserId = userId });
            return StatusCode(response.statusCode, response);
        }
    }
}
