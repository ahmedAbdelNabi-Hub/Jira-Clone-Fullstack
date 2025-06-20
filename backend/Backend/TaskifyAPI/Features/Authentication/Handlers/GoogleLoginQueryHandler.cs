using Azure.Core;
using Google.Apis.Auth;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Contracts.IService;
using Taskify.Core.Modals;
using TaskifyAPI.Features.Authentication.Queries;
using static Google.Apis.Auth.GoogleJsonWebSignature;


namespace TaskifyAPI.Features.Authentication.Handlers
{
    public class GoogleLoginQueryHandler : IRequestHandler<GoogleLoginQuery, BaseApiResponse>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtService _jwtService;

        public GoogleLoginQueryHandler(UserManager<AppUser> userManager, IJwtService jwtService)
        {
            _userManager = userManager;
            _jwtService = jwtService;
         
        }

        public async Task<BaseApiResponse> Handle(GoogleLoginQuery request, CancellationToken cancellationToken)
        {
           
            var existingUser = await _userManager.FindByEmailAsync(request.Payload.Email);
            if (existingUser != null)
            {
                return await _jwtService.CreateJwtToken(existingUser);
            }
            return new BaseApiResponse(StatusCodes.Status404NotFound,"User not found");
        }
    }

}
