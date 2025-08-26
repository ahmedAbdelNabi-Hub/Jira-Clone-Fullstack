using Domain.Modals;
using Domain.Specification;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;
using TaskifyAPI.Features.Task.Commands;

namespace TaskifyAPI.Features.Task.Handlers
{
    public class CreateTaskCommandHandler : IRequestHandler<CreateTaskCommand, BaseApiResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        public CreateTaskCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<BaseApiResponse> Handle(CreateTaskCommand request, CancellationToken cancellationToken)
        {
            var projectMembers = await _unitOfWork.Repository<ProjectMember>()
                               .GetAllWithSpecAsync(new ProjectMemberSpecifications(request.ProjectId , request.assignedUsers));
            
            if(projectMembers.Count != request.assignedUsers.Count)
                return new BaseApiResponse{statusCode = 400,message = "One or more users are not members of this project."};

            var task = new TaskItem
            {
                Title = request.Title,
                Description = request.Description,
                Status = request.Status,
                Type = request.Type,
                Priority = request.Priority,
                SprintId = request.SprintId,
                ProjectId = request.ProjectId,
                TaskAssignments = projectMembers.Select(pm => new TaskAssignment{ProjectMemberId = pm.Id }).ToList()
            };

            await  _unitOfWork.Repository<TaskItem>().AddAsync(task);
            await _unitOfWork.SaveChangeAsync();

            return new BaseApiResponse
            {
                message = "Task created successfully",
                statusCode = 200
            };
        }

         
    }
}
