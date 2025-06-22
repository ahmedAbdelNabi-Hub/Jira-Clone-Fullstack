using MediatR;
using Taskify.Contracts.DTOs._Sprint;
using Taskify.Contracts.DTOs.Task;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;
using Taskify.Core.Specification;
using TaskifyAPI.Features.Sprints.Queries;
using Microsoft.EntityFrameworkCore;

namespace TaskifyAPI.Features.Sprints.Handlers
{
    public class GetAllSprintsHandler : IRequestHandler<GetAllSprintsQuery, IEnumerable<SprintDTO>>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetAllSprintsHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<SprintDTO>> Handle(GetAllSprintsQuery request, CancellationToken cancellationToken)
        {
            var spec = new SprintSpecifications();
            var sprints = await _unitOfWork.Repository<Sprint>().GetProjectedAsync(
                selector: s => new SprintDTO
                {
                    Id = s.Id,
                    Name = s.Name,
                    StartDate = s.StartDate,
                    EndDate = s.EndDate,
                    IsActive = s.IsActive,
                    Tasks = s.Tasks.Select(t => new TaskItemDTO
                    {
                        Id = t.Id,
                        Title = t.Title,
                        Description = t.Description,
                        Status = (int) t.Status,
                        Type = (int) t.Type,
                        Priority = (int) t.Priority,
                    }).ToList()
                },
                spec
            );

            return sprints;
        }
    }
}
