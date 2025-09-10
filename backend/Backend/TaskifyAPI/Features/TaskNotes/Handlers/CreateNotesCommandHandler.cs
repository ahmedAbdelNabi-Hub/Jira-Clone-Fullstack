using MediatR;
using Microsoft.EntityFrameworkCore;
using Presentation.Features.TaskNotes.Commands;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;
using Domain.Modals;
namespace Presentation.Features.TaskNotes.Handlers
{
    public class CreateNotesCommandHandler : IRequestHandler<CreateNotesCommand, BaseApiResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        public CreateNotesCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseApiResponse> Handle(CreateNotesCommand request, CancellationToken cancellationToken)
        {
            var taskItem = await _unitOfWork.Repository<TaskItem>().GetByIdAsync(request.TaskItemId);
            if (taskItem == null)
            {
                return new BaseApiResponse
                {
                    statusCode = 404,
                    message = "Task not found"
                };
            }

            var note = new  TaskNote
            {
                TaskItemId = request.TaskItemId,
                UserId = request.UserId,
                Content = request.Content
            };

            await _unitOfWork.Repository<TaskNote>().AddAsync(note);
            await _unitOfWork.SaveChangeAsync();

            return new BaseApiResponse
            {
                statusCode = 200,
                message = "Note created successfully",

            };
        }
    }
}
