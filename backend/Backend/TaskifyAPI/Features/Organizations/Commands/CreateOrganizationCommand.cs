using MediatR;
using Taskify.Contracts.DTOs.CustomResponses;

namespace TaskifyAPI.Features.Organizations.Commands
{
    public class CreateOrganizationCommand : IRequest<BaseApiResponse>
    {
        public string Name { get; set; }
        public string Slug { get; set; }
        public string Type { get; set; }
        public string ImageUrl { get; set; }
        public string UserId { get; set; }
    }
}
