using AutoMapper;
using Domain.Specification;
using MediatR;
using Presentation.Features.Task.Queries;
using Taskify.Contracts.DTOs.Task;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;

namespace Presentation.Features.Task.Handlers
{
    public class GetAllTaskHandler : IRequestHandler<GetAllTaskQuary, IReadOnlyList<TaskItemDTO?>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetAllTaskHandler(IUnitOfWork unitOfWork , IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<IReadOnlyList<TaskItemDTO?>> Handle(GetAllTaskQuary request, CancellationToken cancellationToken)
        {
            var spec = new TaskSpecifications(projectId:request.projectId,request.filter);
            var tasks = await _unitOfWork.Repository<TaskItem>().GetProjectedAsync(selector: t=>new TaskItemDTO
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                Status = (int)t.Status,
                Priority =(int) t.Priority,
                SprintStartDate = t.Sprint!.StartDate,
                SprintEndDate = t.Sprint.EndDate,
                Type = (int)t.Type,
                AssignedUsers = t.TaskAssignments.Select(ta=>new Contracts.DTOs.Member.MemberDTO {
                  Email = ta.ProjectMember.User.Email!,
                  UserId = ta.ProjectMember.UserId,
                  FullName = ta.ProjectMember.User.FullName,
                  Image = ta.ProjectMember.User.ProfileImage,
                }).ToList()
            } , spec);

            if (tasks == null)
                return null;

            return tasks;
        }
    }
}
