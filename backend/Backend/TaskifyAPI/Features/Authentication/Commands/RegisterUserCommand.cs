using MediatR;
using Taskify.Contracts.DTOs.Authentication;
using Taskify.Contracts.DTOs.CustomResponses;


namespace TaskifyAPI.Features.Authentication.Commands
{
    public record RegisterUserCommand (UserRegistrationDTO UserInfo):IRequest<BaseApiResponse>;
}
