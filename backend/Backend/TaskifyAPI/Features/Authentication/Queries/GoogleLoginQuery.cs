using Google.Apis.Auth;
using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;

namespace TaskifyAPI.Features.Authentication.Queries
{
    public record GoogleLoginQuery(GoogleJsonWebSignature.Payload Payload):IRequest<BaseApiResponse>;
    
}
