using Google.Apis.Auth;
using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;

namespace TaskifyAPI.Features.Authentication.Commands
{
    public record RegisterWithGoogleCommand(GoogleJsonWebSignature.Payload Payload):IRequest<BaseApiResponse>;
   
}
