using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;

namespace Presentation.Features.TaskNotes.Queries
{
    public class GetNotesByTaskIdQuery : IRequest<BaseApiResponse>
    {
        public int TaskItemId { get; set; }
    }
}
