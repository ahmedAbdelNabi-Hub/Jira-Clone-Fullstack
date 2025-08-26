using AutoMapper;
using MediatR;
using Presentation.Features.Projects.Queries;
using Taskify.Contracts.DTOs._Project;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;

namespace Presentation.Features.Projects.Handlers
{
    public class GetByIdHandler : IRequestHandler<GetByIdQuery, Project?>
    {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;
        public GetByIdHandler(IUnitOfWork unitOfWork , IMapper mapper )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Project?> Handle(GetByIdQuery request, CancellationToken cancellationToken)
        {
            var project = await _unitOfWork.Repository<Project>().GetByIdAsync(request.id);
            if (project == null)
                return null;
            return  project;
        }
    }
}
