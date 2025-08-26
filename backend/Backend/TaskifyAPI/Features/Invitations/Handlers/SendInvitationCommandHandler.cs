using MediatR;
using Presentation.Features.Invitations.Commands;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Contracts.IService;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;

namespace Presentation.Features.Invitations.Handlers
{
    public class SendInvitationCommandHandler : IRequestHandler<SendInvitationCommand, BaseApiResponse>
    {
        private readonly IEmailService _emailService;
        private readonly IUnitOfWork _unitOfWork;

        public SendInvitationCommandHandler(IEmailService emailService, IUnitOfWork unitOfWork)
        {
            _emailService = emailService;
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseApiResponse> Handle(SendInvitationCommand request, CancellationToken cancellationToken)
        {
            var project = await _unitOfWork.Repository<Project>().GetByIdAsync(request.ProjectId);
            if (project == null)
            {
                return new BaseApiResponse(StatusCodes.Status404NotFound, "project not found.");
            }


            var token = Guid.NewGuid().ToString();
            var invitation = new Domain.Modals.Invitation
            {
                ProjectId = project.Id,  
                Email = request.InviteeEmail,
                Token = token,
                IsAccepted = false,
                ExpiryDate = DateTime.UtcNow.AddDays(7),
                Role = "member"
            };

            await _unitOfWork.Repository<Domain.Modals.Invitation>().AddAsync(invitation);
            var result = await _unitOfWork.SaveChangeAsync();
            if (result <= 0)
            {
                return new BaseApiResponse(StatusCodes.Status500InternalServerError, "Failed to create invitation.");
            }
            var frontEndUrl = $"Click here to join: http://localhost:4200/invitations/accept?token={token}";
            await _emailService.SendEmailAsync(request.InviteeEmail, project.Name, frontEndUrl);
            return new BaseApiResponse(StatusCodes.Status200OK, "Invitation sent successfully.");
        }
    }
}
