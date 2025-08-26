using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Core.Enums;

namespace Presentation.Features.Sprints.Commands
{
    public class UpdateSprintStatusCommand : IRequest<BaseApiResponse>
    {
        public int SprintId { get; set; }
        public SprintStatus NewStatus { get; set; }
    }
}
