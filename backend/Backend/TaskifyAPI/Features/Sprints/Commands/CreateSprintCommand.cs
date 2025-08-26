using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;

namespace TaskifyAPI.Features.Sprints.Commands
{
    public class CreateSprintCommand :IRequest<BaseApiResponse>
    {
        public string Name { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int ProjectId { get; set; }
        public string Goal { get ; set; }   
    }
}
