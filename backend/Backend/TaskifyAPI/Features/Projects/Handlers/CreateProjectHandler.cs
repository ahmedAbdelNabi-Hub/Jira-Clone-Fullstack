using Domain.Modals;
using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;
using TaskifyAPI.Features.Projects.Commands;

namespace TaskifyAPI.Features.Projects.Handlers
{
    public class CreateProjectHandler : IRequestHandler<CreateProjectCommand, BaseApiResponse>
    {
        private IUnitOfWork _unitOfWork;
        public CreateProjectHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<BaseApiResponse> Handle(CreateProjectCommand request, CancellationToken cancellationToken)
        {
            var slug = request.Name.ToLower()
                         .Replace(" ", "-")
                         .Replace(":", "")
                         .Replace(",", "")
                         .Replace(".", "");

            var project = new Project
            {
                Name = request.Name,
                Key = request.Key,
                Slug = slug,
                Description = request.Description,
                LogoUrl = request.LogoUrl,
                OrganizationId = request.OrganizationId,
                CreateAt = DateTime.UtcNow,
                UpdateAt = DateTime.UtcNow
            };

            await _unitOfWork.Repository<Project>().AddAsync(project);

            var projectMember = new ProjectMember
            {
                Project = project,
                UserId = request.UserId,
                Role = "Owner",
            };

            await _unitOfWork.Repository<ProjectMember>().AddAsync(projectMember);
            await _unitOfWork.SaveChangeAsync();
            return new BaseApiResponse(201, "Project created successfully");

        }
    }
}
