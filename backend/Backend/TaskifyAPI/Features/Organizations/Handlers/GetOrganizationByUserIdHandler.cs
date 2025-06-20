using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Contracts.DTOs._Organization;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;
using Taskify.Core.Specification;
using TaskifyAPI.Features.Organizations.Queries;

namespace TaskifyAPI.Features.Organizations.Handlers
{
    public class GetOrganizationByUserIdHandler : IRequestHandler<GetOrganizationByUserIdQuery, Organization?>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetOrganizationByUserIdHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Organization?> Handle(GetOrganizationByUserIdQuery request, CancellationToken cancellationToken)
        {
            var org = await _unitOfWork.Repository<Organization>().GetByIdSpecAsync(new OrganizationSpecifictions(request.userId));
            return org;
        }
    }
}
