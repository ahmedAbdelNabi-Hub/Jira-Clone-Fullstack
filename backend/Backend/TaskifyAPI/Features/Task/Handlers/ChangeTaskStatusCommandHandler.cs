using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Enums;
using Taskify.Core.Modals;
using Presentation.Features.Task.Commands;

namespace Presentation.Features.Task.Handlers
{
    public class ChangeTaskStatusCommandHandler : IRequestHandler<ChangeTaskStatusCommand, BaseApiResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public ChangeTaskStatusCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseApiResponse> Handle(ChangeTaskStatusCommand request, CancellationToken cancellationToken)
        {
            var taskRepo = _unitOfWork.Repository<TaskItem>();

            var task = await taskRepo.GetByIdAsync(request.TaskId);
            if (task == null)
                return new  BaseApiResponse(404, "Task not found");

            if (!Enum.IsDefined(typeof(WorkItemStatus), request.NewStatus))
                return new  BaseApiResponse(400, "Invalid status value");

            task.Status = (WorkItemStatus)request.NewStatus;
            await _unitOfWork.SaveChangeAsync();

            return new BaseApiResponse(200,"Task status updated successfully");
        }
    }
}
