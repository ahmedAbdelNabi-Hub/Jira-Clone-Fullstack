using Contracts.DTOs._Project;
using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Core.Modals;

namespace Presentation.Features.Projects.Commands
{
    public record UpdateProjectComment (Project project,UpdateProjectDTO data) : IRequest<BaseApiResponse>; 
   
}
