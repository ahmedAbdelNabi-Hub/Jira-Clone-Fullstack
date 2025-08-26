using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Contracts.DTOs.Task;
using Taskify.Core.Enums;

namespace Presentation.Features.Task.Commands
{
    public record UpdateTaskCommand(
     int Id,
     string Title,
     List<string> assignedUsers,
     string? Description,
     WorkItemStatus Status = WorkItemStatus.ToDo,
     TaskType Type = TaskType.Task,
     TaskPriority Priority = TaskPriority.Low
    ) : IRequest<BaseApiResponse>;
   
}
