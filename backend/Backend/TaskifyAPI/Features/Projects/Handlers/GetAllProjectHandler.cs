using AutoMapper;
using Domain.Modals;
using Domain.Specification;
using MediatR;
using Taskify.Contracts.DTOs._Project;
using Taskify.Core.Interface.UnitOfWork;
using TaskifyAPI.Features.Projects.Queries;

public class GetAllProjectsByUserHandler : IRequestHandler<GetAllProjectQuery, IEnumerable<ProjectDTO>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public GetAllProjectsByUserHandler(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ProjectDTO>> Handle(GetAllProjectQuery request, CancellationToken cancellationToken)
    {
        var spec = new ProjectMemberSpecifications(request.userId);

        var projects = await _unitOfWork.Repository<ProjectMember>().GetProjectedAsync(
            selector: p => new ProjectDTO
            {
                id = p.Project.Id,
                Name = p.Project.Name,
                LogoUrl = p.Project.LogoUrl,
                Description = p.Project.Description
            },
            spec
        );

        return projects ?? Enumerable.Empty<ProjectDTO>();
    }
}
