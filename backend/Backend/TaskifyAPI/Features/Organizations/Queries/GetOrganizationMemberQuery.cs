using Contracts.DTOs.Member;
using MediatR;

namespace Presentation.Features.Organizations.Queries
{
    public record GetOrganizationMemberQuery(int orgId) : IRequest<List<MemberDTO>>;
    

    
}
