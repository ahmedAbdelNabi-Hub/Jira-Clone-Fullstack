using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;

namespace Presentation.Features.Task.Commands
{
    public class ChangeTaskStatusCommand : IRequest<BaseApiResponse>
    {
        public int TaskId { get; set; }
        public int NewStatus { get; set; } 
    }
}
