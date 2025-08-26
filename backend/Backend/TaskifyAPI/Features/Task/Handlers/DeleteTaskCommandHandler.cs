using Domain.Modals;
using Domain.Specification;
using MediatR;
using Presentation.Features.Task.Commands;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;

namespace Presentation.Features.Task.Handlers
{
    public class DeleteTaskCommandHandler : IRequestHandler<DeleteTaskCommand, BaseApiResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        public DeleteTaskCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<BaseApiResponse> Handle(DeleteTaskCommand request, CancellationToken cancellationToken)
        {

            var taskRepo = _unitOfWork.Repository<TaskItem>();
            var task = await taskRepo.GetByIdSpecAsync(new TaskSpecifications(taskId:request.taskId));
            if (task == null)
                return new BaseApiResponse(StatusCodes.Status404NotFound , "Task Is Not Found");

            await _unitOfWork.BeginTransactionAsync();
            if(task.TaskAssignments !=null)
                await _unitOfWork.Repository<TaskAssignment>().DeleteRangeAsync(task.TaskAssignments);

            await taskRepo.DeleteAsync(task);

            await _unitOfWork.SaveChangeAsync();
            await _unitOfWork.CommitAsync();

            return new BaseApiResponse(StatusCodes.Status200OK, "Task Is Deleted successfully");
        }
    }
}
