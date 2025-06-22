using MediatR;
using Microsoft.AspNetCore.Mvc;
using TaskifyAPI.Features.Sprints.Commands;
using TaskifyAPI.Features.Sprints.Queries;

namespace TaskifyAPI.Controllers
{
    [ApiController]
    [Route("/api/v1/[controller]")]
    public class SprintsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SprintsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateSprintCommand command)
        {
            var response = await _mediator.Send(command);
            return StatusCode(response.statusCode,response);
        }

        [HttpGet("sprints")]
        public async Task<IActionResult> GetAllSprintsWithTasks()
        {
            var result = await _mediator.Send(new GetAllSprintsQuery());
            return Ok(result);
        }
    }
}
