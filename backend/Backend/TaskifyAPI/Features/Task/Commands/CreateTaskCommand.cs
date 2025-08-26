using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Core.Enums;

namespace TaskifyAPI.Features.Task.Commands
{
    public record CreateTaskCommand(
     string Title,
     List<string> assignedUsers,
     int ProjectId,
     int SprintId,
     string? Description,
     WorkItemStatus Status = WorkItemStatus.ToDo,
     TaskType Type = TaskType.Task,
     TaskPriority Priority = TaskPriority.Low
   ) : IRequest<BaseApiResponse>;
}
