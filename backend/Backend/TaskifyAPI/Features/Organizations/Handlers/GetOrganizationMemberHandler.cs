using Contracts.DTOs.Member;
using Domain.Modals;
using Domain.Specification;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presentation.Features.Organizations.Queries;
using Taskify.Core.Interface.UnitOfWork;

namespace Presentation.Features.Organizations.Handlers
{
    public class GetOrganizationMemberHandler : IRequestHandler<GetOrganizationMemberQuery, List<MemberDTO>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetOrganizationMemberHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<MemberDTO>> Handle(GetOrganizationMemberQuery request, CancellationToken cancellationToken)
        {

            var query =  _unitOfWork.Repository<ProjectMember>().GetQueryableWithSpec(new ProjectMemberSpecifications(organizationId: request.orgId));
            var projectMembers =  await query.Select(pm => new MemberDTO()
            {
                UserId = pm.UserId,
                Email = pm.User.Email!,
                Image = pm.User.ProfileImage,
                FullName = pm.User.FullName,
                Role = pm.Role,
            }).Distinct().ToListAsync();
 
            return projectMembers;
        }
    }
}
