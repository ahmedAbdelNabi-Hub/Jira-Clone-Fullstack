using MediatR;
using Taskify.Contracts.DTOs._Project;
using Taskify.Core.Modals;

namespace Presentation.Features.Projects.Queries
{
    public record GetByIdQuery (int id) : IRequest<Project?>;
    
    
}
