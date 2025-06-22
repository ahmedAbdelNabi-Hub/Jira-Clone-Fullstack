using MediatR;
using System.Collections;
using Taskify.Contracts.DTOs._Sprint;

namespace TaskifyAPI.Features.Sprints.Queries
{
    public class GetAllSprintsQuery : IRequest<IEnumerable<SprintDTO>>
    {
    }
}
