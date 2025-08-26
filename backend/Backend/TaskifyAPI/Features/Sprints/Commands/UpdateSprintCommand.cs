using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;

namespace Presentation.Features.Sprints.Commands
{
    public class UpdateSprintCommand : IRequest<BaseApiResponse>
    {
        public string Name { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int SprintId { get; set; }
    }
}