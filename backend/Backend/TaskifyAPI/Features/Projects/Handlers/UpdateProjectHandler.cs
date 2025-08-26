using MediatR;
using Presentation.Features.Projects.Commands;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Infrastructure.UnitOfWork;
using TaskifyAPI.Helper.Upload;

namespace Presentation.Features.Projects.Handlers
{
    public class UpdateProjectHandler : IRequestHandler<UpdateProjectComment, BaseApiResponse>
    {
        private IUnitOfWork _unitOfWork;
        public UpdateProjectHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseApiResponse> Handle(UpdateProjectComment request, CancellationToken cancellationToken)
        {
            var project = request.project;
            var data = request.data;
            string? logoFile = null;

            if (data.LogoFile != null)
            {
                logoFile = UpdateLogoFile(data.LogoFile , project.LogoUrl);
            }

            project.Id = data.id;
            project.Name = data.Name;
            project.Description = data.Description;
            project.Key = data.Key;
            project.Slug = data.Slug;
            project.LogoUrl = logoFile == null ? project.LogoUrl : logoFile;

            var isSucced = await _unitOfWork.SaveChangeAsync(cancellationToken);
            if (isSucced > 0)
                return new BaseApiResponse(StatusCodes.Status200OK, "project Update");

            return new BaseApiResponse(StatusCodes.Status500InternalServerError, "Fail for update project");

        }

        private string UpdateLogoFile(IFormFile LogoFile , string oldFileName )
        {
            var (uploadResult, fileName) = DocumentSettings.UpdateFile(LogoFile, "projects", oldFileName);
            return fileName!;
        }

        
    }
}
