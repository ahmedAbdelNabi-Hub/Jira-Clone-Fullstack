using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;

namespace Presentation.Features.Invitations.Commands
{
    public class SendInvitationCommand : IRequest<BaseApiResponse>
    {
        public int ProjectId { get; set; }
        public string InviteeEmail { get; set; }
    }
}
