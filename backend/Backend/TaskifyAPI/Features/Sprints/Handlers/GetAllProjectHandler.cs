using AutoMapper;
using MediatR;
using Taskify.Contracts.DTOs._Project;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;
using Taskify.Core.Specification;
using TaskifyAPI.Features.Projects.Queries;

namespace TaskifyAPI.Features.Sprints.Handlers
{
    public class GetAllProjectHandler : IRequestHandler<GetAllProjectQuary, IEnumerable<ProjectDTO>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetAllProjectHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ProjectDTO>> Handle(GetAllProjectQuary request, CancellationToken cancellationToken)
        {
            var spec = new ProjectSpecifications(orgId: request.orgId);

            var projects = await _unitOfWork.Repository<Project>().GetAllWithSpecAsync(spec);

            if (projects == null || !projects.Any())
                return Enumerable.Empty<ProjectDTO>();

            return _mapper.Map<IEnumerable<ProjectDTO>>(projects);
        }
    }

}
