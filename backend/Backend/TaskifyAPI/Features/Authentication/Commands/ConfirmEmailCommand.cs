using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;

namespace TaskifyAPI.Features.Authentication.Commands
{
    public class ConfirmEmailCommand : IRequest<BaseApiResponse>
    {
        public string Email { get; set; }
        public string OTP { get; set; }
    }
}
