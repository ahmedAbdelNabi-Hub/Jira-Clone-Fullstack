using Microsoft.AspNetCore.Mvc;
using MediatR;
using TaskifyAPI.Features.Task.Commands;
using Taskify.Contracts.DTOs.CustomResponses;
using Presentation.Features.Task.Queries;
using Taskify.Contracts.DTOs.Task;
using Presentation.Features.Task.Commands;
using Domain.Specification.QueryParameters;

namespace TaskifyAPI.Controllers
{
    [ApiController]
    [Route("/api/v1/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TasksController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{projectId}")]
        public async Task<ActionResult<IReadOnlyList<TaskItemDTO>>> GetAllTask(int projectId, [FromQuery] TaskFilterParameters filter, CancellationToken cancellationToken)
        {
            var tasks = await _mediator.Send(new GetAllTaskQuary(projectId,filter), cancellationToken);
            if (tasks == null)
                return NotFound(new BaseApiResponse(StatusCodes.Status404NotFound,"Not Fount Task"));
            return Ok(tasks);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateTaskCommand command, CancellationToken cancellationToken)
        {
            BaseApiResponse result = await _mediator.Send(command, cancellationToken);
            return StatusCode(result.statusCode, result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] UpdateTaskCommand command)
        {

            var result = await _mediator.Send(command);
            return StatusCode(result.statusCode, result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseApiResponse>> DeleteTask(int id)
        {
            var result = await _mediator.Send(new DeleteTaskCommand(id));
            return StatusCode(result.statusCode, result);
        }

    }
}
