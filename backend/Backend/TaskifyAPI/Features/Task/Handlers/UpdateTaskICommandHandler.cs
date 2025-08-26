using AutoMapper.Execution;
using Domain.Modals;
using Domain.Specification;
using MediatR;
using Presentation.Features.Task.Commands;
using System.Linq;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Core.Enums;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;
using Taskify.Core.Specification;

namespace Presentation.Features.Task.Handlers
{
    public class UpdateTaskICommandHandler : IRequestHandler<UpdateTaskCommand, BaseApiResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        public UpdateTaskICommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<BaseApiResponse> Handle(UpdateTaskCommand request, CancellationToken cancellationToken)
        {
            var task = await _unitOfWork.Repository<TaskItem>().GetByIdSpecAsync(new TaskSpecifications(taskId: request.Id));
            if (task == null) 
                return new BaseApiResponse(StatusCodes.Status404NotFound, "The Task Not Found");
           
            task.Title = request.Title;
            task.Description = request.Description;
            task.Status = (WorkItemStatus)request.Status;
            task.Type = (TaskType)request.Type;
            task.Priority = (TaskPriority)request.Priority;

            var currentMemberIds = task.TaskAssignments.Select(x => x.ProjectMember.UserId).ToList();

            var removedMemberIds = currentMemberIds.Except(request.assignedUsers).ToList();
            var addedMemberIds = request.assignedUsers.Except(currentMemberIds).ToList();
            var taskAssignmentRepo = _unitOfWork.Repository<TaskAssignment>();
           
            foreach (var userId in removedMemberIds)
            {
                var member = await taskAssignmentRepo.GetByIdSpecAsync(new TaskAssignmentSpecifications(userId));
                if(member !=null)
                    await taskAssignmentRepo.DeleteAsync(member);
            }

            foreach (var userId in addedMemberIds)
            {
                var projectMember = await _unitOfWork.Repository<ProjectMember>().GetByIdSpecAsync(new ProjectMemberSpecifications(userId,task.ProjectId));
                if (projectMember != null)
                {

                   await taskAssignmentRepo.AddAsync(new TaskAssignment
                    {
                        ProjectMemberId = projectMember.Id,
                        TaskItemId = task.Id
                    });
                }
            }

            await _unitOfWork.SaveChangeAsync();
            return new BaseApiResponse(StatusCodes.Status200OK, "Task Updated Successfully");

        }
    }
}
