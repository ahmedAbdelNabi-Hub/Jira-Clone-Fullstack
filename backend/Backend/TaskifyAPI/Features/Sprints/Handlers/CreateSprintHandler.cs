using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;
using TaskifyAPI.Features.Sprints.Commands;


namespace TaskifyAPI.Features.Sprints.Handlers
{
    public class CreateSprintHandler : IRequestHandler<CreateSprintCommand, BaseApiResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateSprintHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseApiResponse> Handle(CreateSprintCommand request, CancellationToken cancellationToken)
        {
            var sprint = new Sprint
            {
                Name = request.Name,
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                IsActive = false,
                ProjectId = request.ProjectId
            };

            await _unitOfWork.Repository<Sprint>().AddAsync(sprint);
            var isSucceeded = await _unitOfWork.SaveChangeAsync() > 0;

            if (isSucceeded)
                return new BaseApiResponse(200, "Sprint created successfully");
            else
                return new BaseApiResponse(500, "Failed to create sprint");
            
        }

    }
}
