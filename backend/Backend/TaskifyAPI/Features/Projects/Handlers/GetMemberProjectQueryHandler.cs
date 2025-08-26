using AutoMapper;
using Contracts.DTOs.Member;
using Domain.Modals;
using Domain.Specification;
using MediatR;
using Presentation.Features.Projects.Queries;
using Taskify.Core.Interface.UnitOfWork;

namespace Presentation.Features.Projects.Handlers
{
    public class GetMemberProjectQueryHandler : IRequestHandler<GetMemberProjectQuery, List<MemberDTO>>
    {
        private IUnitOfWork _unitOfWork;
        public GetMemberProjectQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<MemberDTO>> Handle(GetMemberProjectQuery request, CancellationToken cancellationToken)
        { 
            var specifications = new ProjectMemberSpecifications(projectId: request.projectId);
            var projectMembers = await _unitOfWork.Repository<ProjectMember>().GetProjectedAsync(selector: pm=>new MemberDTO { 
              Email = pm.User.Email!,
              FullName = pm.User.FullName,
              Image = pm.User.ProfileImage,
              UserId = pm.User.Id,  
              Role = pm.Role,
            }, specifications);
            return projectMembers;
        }
    }
}
