using Domain.Modals;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Presentation.Features.TaskNotes.Queries;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Infrastructure.Data;

namespace Presentation.Features.TaskNotes.Handlers
{
    public class GetNotesByTaskIdQueryHandler : IRequestHandler<GetNotesByTaskIdQuery, BaseApiResponse>
    {
        private readonly TaskifyDbContext _dbContext;

        public GetNotesByTaskIdQueryHandler(TaskifyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<BaseApiResponse> Handle(GetNotesByTaskIdQuery request, CancellationToken cancellationToken)
        {
            var notesWithUsers = await (from note in _dbContext.TaskNotes
                                        join user in _dbContext.AppUsers
                                            on note.UserId equals user.Id
                                        where note.TaskItemId == request.TaskItemId
                                        orderby note.CreateAt descending
                                        select new
                                        {
                                            note.Id,
                                            note.TaskItemId,
                                            note.UserId,
                                            note.Content,
                                            note.CreateAt,
                                            UserName = user.FullName,
                                            Email = user.Email,
                                            Image = user.ProfileImage,
                                        })
                              .ToListAsync(cancellationToken);



            if (notesWithUsers.Count == 0)
            {
                return new BaseApiResponse
                {
                    statusCode = 404,
                    message = "No notes found for this task."
                };
            }

            return new BaseApiResponse
            {
                statusCode = 200,
                message = "Notes retrieved successfully",
                data = notesWithUsers
            };
        }
    }
}
