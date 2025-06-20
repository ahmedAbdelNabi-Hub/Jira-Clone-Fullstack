using MediatR;
using Microsoft.AspNetCore.Identity;
using Taskify.Contracts.DTOs.Authentication;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Contracts.IService;
using Taskify.Core.Modals;
using Taskify.Services.JWT;
using TaskifyAPI.Features.Authentication.Queries;

namespace TaskifyAPI.Features.Authentication.Handlers
{
    public class LoginUserQueryHandler : IRequestHandler<LoginUserQuery, BaseApiResponse>
    {
        private readonly IJwtService _jwtService;
        private readonly UserManager<AppUser> _userManager;
        public LoginUserQueryHandler(IJwtService jwtService, UserManager<AppUser> userManager)
        {
            _jwtService = jwtService;
            _userManager = userManager;
        }
        public async Task<BaseApiResponse> Handle(LoginUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null) return new BaseApiResponse(StatusCodes.Status404NotFound, "User Not Found");
            var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Password);
            if (!isPasswordValid)
                return new BaseApiResponse(StatusCodes.Status400BadRequest, "Password Not Correct");

            return await _jwtService.CreateJwtToken(user);
        }
    }
}
