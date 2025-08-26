using MediatR;
using System.Collections;
using Taskify.Contracts.DTOs._Sprint;

namespace TaskifyAPI.Features.Sprints.Queries
{
    public record GetAllSprintsQuery (int projectId) : IRequest<IEnumerable<SprintDTO>>;
    
        
    
}
