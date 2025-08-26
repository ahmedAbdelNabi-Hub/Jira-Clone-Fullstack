using MediatR;
using Presentation.Features.Sprints.Commands;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;
using TaskifyAPI.Features.Sprints.Commands;

namespace Presentation.Features.Sprints.Handlers
{
    public class UpdateSprintCommandHandler : IRequestHandler<UpdateSprintCommand, BaseApiResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public UpdateSprintCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseApiResponse> Handle(UpdateSprintCommand request, CancellationToken cancellationToken)
        {
            var sprint = await _unitOfWork.Repository<Sprint>().GetByIdAsync(request.SprintId);
            if (sprint == null)
                return new BaseApiResponse(StatusCodes.Status404NotFound, "The Sprint Not Found");

            sprint.Name = request.Name;
            sprint.StartDate = request.StartDate;
            sprint.EndDate = request.EndDate;
            sprint.Id = request.SprintId;

            await _unitOfWork.SaveChangeAsync();

            return new BaseApiResponse(StatusCodes.Status200OK, "Sprint updated successfully");
        }
    }
}
