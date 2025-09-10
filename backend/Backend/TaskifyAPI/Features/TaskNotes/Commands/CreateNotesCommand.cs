using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;

namespace Presentation.Features.TaskNotes.Commands
{
    public class CreateNotesCommand : IRequest<BaseApiResponse>
    {
        public int TaskItemId { get; set; }
        public string UserId { get; set; }
        public string Content { get; set; } = string.Empty;
    }
}
