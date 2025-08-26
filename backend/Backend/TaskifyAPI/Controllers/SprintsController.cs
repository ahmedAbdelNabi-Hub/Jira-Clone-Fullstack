using MediatR;
using Microsoft.AspNetCore.Mvc;
using Presentation.Features.Sprints.Commands;
using Taskify.Core.Enums;
using TaskifyAPI.Features.Sprints.Commands;
using TaskifyAPI.Features.Sprints.Queries;

namespace TaskifyAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SprintsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SprintsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("/api/v1/sprints")]
        public async Task<IActionResult> Create([FromBody] CreateSprintCommand command)
        {
            var response = await _mediator.Send(command);
            return StatusCode(response.statusCode,response);
        }


        [HttpPut("/api/v1/sprints/{id}")]
        public async Task<IActionResult> UpdateSprint(int id, [FromBody] UpdateSprintCommand command)
        {
            var response = await _mediator.Send(command);
            return StatusCode(response.statusCode, response);
        }

        [HttpDelete("/api/v1/sprints/{id}")]
        public async Task<IActionResult> DeleteSprint(int id)
        {
            var result = await _mediator.Send(new DeleteSprintCommand(id));
            return StatusCode(result.statusCode, result);
        }

        [HttpPut("/api/v1/sprints/{id}/status")]
        public async Task<IActionResult> UpdateSprintStatus(int id, [FromBody] SprintStatus newStatus)
        {
            var result = await _mediator.Send(new UpdateSprintStatusCommand{SprintId = id,NewStatus = newStatus});
            return StatusCode(result.statusCode, result);
        }


        [HttpGet("/api/v1/sprints")]
        public async Task<IActionResult> GetAllSprintsWithTasks([FromQuery] int projectId)
        {
            var result = await _mediator.Send(new GetAllSprintsQuery(projectId));
            return Ok(result);
        }
    }
}
