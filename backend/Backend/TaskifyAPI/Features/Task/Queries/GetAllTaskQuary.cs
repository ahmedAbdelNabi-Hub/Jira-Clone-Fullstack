using Domain.Specification.QueryParameters;
using MediatR;
using Taskify.Contracts.DTOs.Task;

namespace Presentation.Features.Task.Queries
{
    public record GetAllTaskQuary(int projectId,TaskFilterParameters filter) : IRequest<IReadOnlyList<TaskItemDTO?>>;
   
}
