using MediatR;
using Taskify.Core.Modals;

namespace TaskifyAPI.Features.Authentication.Queries
{
    public class GetUserByEmailQuery : IRequest<AppUser?>
    {
        public string Email { get; set; }

        public GetUserByEmailQuery(string email)
        {
            Email = email;
        }
    }

}
