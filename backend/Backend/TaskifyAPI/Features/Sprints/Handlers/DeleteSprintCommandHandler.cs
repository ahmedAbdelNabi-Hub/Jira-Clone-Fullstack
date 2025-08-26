using Domain.Modals;
using MediatR;
using Presentation.Features.Sprints.Commands;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;
using Taskify.Core.Specification;

namespace Presentation.Features.Sprints.Handlers
{
    public class DeleteSprintCommandHandler : IRequestHandler<DeleteSprintCommand, BaseApiResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteSprintCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseApiResponse> Handle(DeleteSprintCommand request, CancellationToken cancellationToken)
        {
            var sprintRepo = _unitOfWork.Repository<Sprint>();
            var sprint = await sprintRepo.GetByIdSpecAsync(new SprintSpecifications(sprintId: request.SprintId));

            if (sprint is null)
                return new BaseApiResponse(StatusCodes.Status404NotFound, "The sprint not found");

            try
            {
                var tasks = sprint.Tasks?.ToList() ?? new List<TaskItem>();
                var taskAssignments = tasks.SelectMany(t => t.TaskAssignments).ToList();

                await _unitOfWork.BeginTransactionAsync();

                if (taskAssignments.Any())
                    await _unitOfWork.Repository<TaskAssignment>().DeleteRangeAsync(taskAssignments);

                if (tasks.Any())
                    await _unitOfWork.Repository<TaskItem>().DeleteRangeAsync(tasks);

                await sprintRepo.DeleteAsync(sprint);
                await _unitOfWork.SaveChangeAsync();
                await _unitOfWork.CommitAsync();

                return new BaseApiResponse(StatusCodes.Status200OK, "Sprint deleted successfully");
            }
            catch (Exception ex)
            {
                await _unitOfWork.RollbackAsync();
                return new BaseApiResponse(StatusCodes.Status500InternalServerError, $"An error occurred: {ex.Message}");
            }
        }

    }
}
