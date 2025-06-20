using MediatR;
using Taskify.Core.Modals;

namespace TaskifyAPI.Features.Organizations.Queries
{
    public record GetOrganizationByUserIdQuery (string userId): IRequest<Organization?>;
   
}
