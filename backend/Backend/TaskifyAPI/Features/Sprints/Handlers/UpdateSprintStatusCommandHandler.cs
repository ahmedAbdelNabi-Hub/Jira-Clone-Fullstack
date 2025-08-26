using MediatR;
using Presentation.Features.Sprints.Commands;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Core.Enums;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;

namespace Presentation.Features.Sprints.Handlers
{
    // Application/Handlers/Sprints/UpdateSprintStatusCommandHandler.cs
    public class UpdateSprintStatusCommandHandler : IRequestHandler<UpdateSprintStatusCommand, BaseApiResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public UpdateSprintStatusCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseApiResponse> Handle(UpdateSprintStatusCommand request, CancellationToken cancellationToken)
        {
            var sprintRepo = _unitOfWork.Repository<Sprint>();
            var sprint = await sprintRepo.GetByIdAsync(request.SprintId);

            if (sprint == null)
                return new BaseApiResponse(StatusCodes.Status404NotFound, "Sprint not found.");

            if (sprint.Status == SprintStatus.Completed && request.NewStatus != SprintStatus.Completed)
                return new BaseApiResponse(StatusCodes.Status400BadRequest, "Cannot change a completed sprint");

            sprint.Status = request.NewStatus;

            await _unitOfWork.SaveChangeAsync();
            return new BaseApiResponse(200,"Sprint Statue Is Change");
        }
    }

}
