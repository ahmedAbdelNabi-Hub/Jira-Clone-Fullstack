using MediatR;
using Taskify.Contracts.DTOs._Project;
using Taskify.Contracts.DTOs.CustomResponses;

namespace TaskifyAPI.Features.Projects.Commands
{
    public record CreateProjectCommand(
            string Name,
            string Key,
            string Description,
            string LogoUrl,
            int OrganizationId,
            string UserId
        ) : IRequest<BaseApiResponse>;
}
