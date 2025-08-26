using AutoMapper;
using Domain.Modals;
using Domain.Specification;
using MediatR;
using Presentation.Features.Projects.Queries;
using Taskify.Contracts.DTOs._Project;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;

namespace Presentation.Features.Projects.Handlers
{
    public class GetOwnedProjectsHandler : IRequestHandler<GetOwnedProjectsQuery, IEnumerable<ProjectDTO>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetOwnedProjectsHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProjectDTO>> Handle(GetOwnedProjectsQuery request, CancellationToken cancellationToken)
        {
            var spec = new ProjectMemberSpecifications().getOwendProjectMember(UserId:request.UserId);

            var projects = await _unitOfWork.Repository<ProjectMember>().GetProjectedAsync(
                selector: p => new ProjectDTO
                {
                    id = p.Project.Id,
                    Name = p.Project.Name,
                    Description = p.Project.Description,
                    LogoUrl = p.Project.LogoUrl
                },
                spec
            );

            return projects ?? Enumerable.Empty<ProjectDTO>();
        }
    }

}
