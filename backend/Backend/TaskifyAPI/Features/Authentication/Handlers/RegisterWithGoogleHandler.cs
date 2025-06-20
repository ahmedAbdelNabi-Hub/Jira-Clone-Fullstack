using MediatR;
using Microsoft.AspNetCore.Identity;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Contracts.IService;
using Taskify.Core.Modals;
using TaskifyAPI.Features.Authentication.Commands;

namespace TaskifyAPI.Features.Authentication.Handlers
{
    public class RegisterWithGoogleHandler : IRequestHandler<RegisterWithGoogleCommand, BaseApiResponse>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        private readonly IJwtService _jwtService;
        private readonly UserManager<AppUser> _userManager;

        public RegisterWithGoogleHandler(IHttpContextAccessor httpContextAccessor ,IJwtService jwtService, UserManager<AppUser> userManager)
        {
            _jwtService = jwtService;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<BaseApiResponse> Handle(RegisterWithGoogleCommand request, CancellationToken cancellationToken)
        {

            var userInfo = request.Payload;
            var newUser = new AppUser
            {
                UserName = userInfo.Email.Split("@")[0],
                Email = userInfo.Email,
                FullName = userInfo.Name,
                ProfileImage = userInfo.Picture,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(newUser);
            if (!result.Succeeded)
            {
                return new BaseApiResponse
                {
                    statusCode = StatusCodes.Status500InternalServerError,
                    message = "User registration failed. Please try again later."
                };
            }
            var jwtToken = await _jwtService.CreateJwtToken(newUser);
            return jwtToken;
        }
    }
}
