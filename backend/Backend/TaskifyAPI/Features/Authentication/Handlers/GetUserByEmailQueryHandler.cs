using MediatR;
using Microsoft.AspNetCore.Identity;
using Taskify.Core.Modals;
using TaskifyAPI.Features.Authentication.Queries;

namespace TaskifyAPI.Features.Authentication.Handlers
{
    public class GetUserByEmailQueryHandler : IRequestHandler<GetUserByEmailQuery, AppUser?>
    {
        private readonly UserManager<AppUser> _userManager;

        public GetUserByEmailQueryHandler(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<AppUser?> Handle(GetUserByEmailQuery request, CancellationToken cancellationToken)
        {
            return await _userManager.FindByEmailAsync(request.Email);
        }
    }

}
