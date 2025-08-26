using Contracts.DTOs.Member;
using MediatR;

namespace Presentation.Features.Projects.Queries
{
    public record GetMemberProjectQuery (int projectId) : IRequest<List<MemberDTO>>;
   
}
