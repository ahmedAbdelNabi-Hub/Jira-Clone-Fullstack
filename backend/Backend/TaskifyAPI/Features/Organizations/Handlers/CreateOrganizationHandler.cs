using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;
using TaskifyAPI.Features.Organizations.Commands;

namespace TaskifyAPI.Features.Organizations.Handlers
{
    public class CreateOrganizationHandler : IRequestHandler<CreateOrganizationCommand, BaseApiResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public CreateOrganizationHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseApiResponse> Handle(CreateOrganizationCommand request, CancellationToken cancellationToken)
        {
            var organization = new Organization
            {
                Name = request.Name,
                Slug = request.Slug,
                Type = request.Type,
                ImageUrl = request.ImageUrl,
                UserId = request.UserId,
                CreateAt = DateTime.UtcNow,
                UpdateAt = DateTime.UtcNow
            };

            await _unitOfWork.Repository<Organization>().AddAsync(organization);
            await _unitOfWork.SaveChangeAsync();
            return new BaseApiResponse(StatusCodes.Status201Created, "Organization created successfully");
        }
    }

}
