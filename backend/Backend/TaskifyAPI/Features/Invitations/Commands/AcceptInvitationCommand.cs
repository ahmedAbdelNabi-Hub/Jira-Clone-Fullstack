using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;

namespace Presentation.Features.Invitations.Commands
{
    public class AcceptInvitationCommand : IRequest<BaseApiResponse>
    {
        public string Token { get; set; }
        public string UserId { get; set; }
    }
}
