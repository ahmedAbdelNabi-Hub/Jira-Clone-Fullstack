using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Presentation.Features.TaskNotes.Commands;
using Presentation.Features.TaskNotes.Queries;
using Taskify.Contracts.DTOs.CustomResponses;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly IMediator _mediator;
        public CommentController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Get all notes for a given task
        /// </summary>
        [Authorize]
        [HttpGet("/api/comments/{taskId}")]
        public async Task<IActionResult> GetNotesByTaskId(int taskId, CancellationToken cancellationToken)
        {
            var query = new GetNotesByTaskIdQuery { TaskItemId = taskId };
            var response = await _mediator.Send(query, cancellationToken);

            return StatusCode(response.statusCode, response.data);
        }

        /// <summary>
        /// Create a new note for a task
        /// </summary>
        [Authorize]
        [HttpPost("/api/comments")]
        public async Task<IActionResult> CreateNote([FromBody] CreateNotesCommand command, CancellationToken cancellationToken)
        {
            var response = await _mediator.Send(command, cancellationToken);
            return StatusCode(response.statusCode, response);
        }
    }
}
