using Domain.Modals;
using Domain.Specification;
using MediatR;
using Presentation.Features.Invitations.Commands;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Contracts.IService;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Core.Modals;

namespace Presentation.Features.Invitations.Handlers
{
    public class AcceptInvitationHandler : IRequestHandler<AcceptInvitationCommand, BaseApiResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public AcceptInvitationHandler(IEmailService emailService, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<BaseApiResponse> Handle(AcceptInvitationCommand request, CancellationToken cancellationToken)
        {

            var invitation = await _unitOfWork.Repository<Invitation>().GetByIdSpecAsync(new InvitationSpecifications(request.Token));

            if (invitation == null)
                return new BaseApiResponse(StatusCodes.Status400BadRequest, "The invitation not found ");

            if (DateTime.UtcNow > invitation.ExpiryDate)
                return new BaseApiResponse(StatusCodes.Status400BadRequest, "The invitation is expire ");

            var project = await _unitOfWork.Repository<Project>().GetByIdAsync(invitation.ProjectId);
            if (project == null)
                return new BaseApiResponse(StatusCodes.Status404NotFound, "project not found.");

            //if (project. == request.UserId)
            //    return new BaseApiResponse(StatusCodes.Status400BadRequest, "The owner cannot accept an invitation to join their own organization.");

            var existingMember = await _unitOfWork.Repository<ProjectMember>().GetByIdSpecAsync(new ProjectMemberSpecifications(request.UserId, invitation.ProjectId));
            if (existingMember != null)
                return new BaseApiResponse(StatusCodes.Status400BadRequest, "You are already a member of this Project.");

            var member = new ProjectMember
            {
                UserId = request.UserId,
                ProjectId = invitation.ProjectId,
                Role = invitation.Role
            };

            await _unitOfWork.Repository<ProjectMember>().AddAsync(member);
            var result = await _unitOfWork.SaveChangeAsync();
            if (result <= 0)
            {
                return new BaseApiResponse(StatusCodes.Status500InternalServerError, "Failed to create invitation.");
            }
            return new BaseApiResponse(StatusCodes.Status200OK, "Invitation accept successfully.");
        }
    }
}