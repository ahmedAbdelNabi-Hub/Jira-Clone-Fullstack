using MediatR;
using Taskify.Contracts.DTOs._Project;

namespace Presentation.Features.Projects.Queries
{
    public record GetOwnedProjectsQuery(string UserId) : IRequest<IEnumerable<ProjectDTO>>;

}
