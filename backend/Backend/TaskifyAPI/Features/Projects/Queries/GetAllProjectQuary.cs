using MediatR;
using System.Collections;
using Taskify.Contracts.DTOs._Project;

namespace TaskifyAPI.Features.Projects.Queries
{
    public record GetAllProjectQuary(int orgId) : IRequest<IEnumerable<ProjectDTO>>;
    
}
