using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;

namespace TaskifyAPI.Features.Authentication.Queries
{
    public record LoginUserQuery(string Email , string Password):IRequest<BaseApiResponse>;

}
