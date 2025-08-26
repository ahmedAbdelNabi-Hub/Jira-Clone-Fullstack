using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;

namespace Presentation.Features.Sprints.Commands
{
    public record DeleteSprintCommand(int SprintId) : IRequest<BaseApiResponse>;

}
