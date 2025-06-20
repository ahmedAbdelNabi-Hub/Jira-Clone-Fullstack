using MediatR;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Identity;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Contracts.IService;
using Taskify.Core.Modals;
using TaskifyAPI.Features.Authentication.Commands;
using TaskifyAPI.Features.Authentication.Queries;
using TaskifyAPI.Helper.Upload;

namespace TaskifyAPI.Features.Authentication.Handlers
{
    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, BaseApiResponse>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMediator _mediator;
        private readonly IEmailService _emailService;   
        public RegisterUserCommandHandler(IMediator mediator,IEmailService emailService, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _mediator = mediator;
            _emailService = emailService;

        }

        public async Task<BaseApiResponse> Handle(RegisterUserCommand Info, CancellationToken cancellationToken)
        {
            var request = Info.UserInfo;
            var user = await _mediator.Send(new GetUserByEmailQuery(request.Email));           
            if (user != null)
            {
                return new BaseApiResponse
                {
                    statusCode = StatusCodes.Status404NotFound,
                    message = "User with this email already exists."
                };
            }

            var (uploadResponse, fileName) = DocumentSettings.UploadFile(request.Image, "profile");
            if (uploadResponse.statusCode != 200 || string.IsNullOrEmpty(fileName))
            {
                return uploadResponse;
            }

            var newUser = new AppUser
            {
                UserName = request.Email.Split("@")[0],
                Email = request.Email,
                FullName = request.FullName,
                ProfileImage = fileName
            };

            var result = await _userManager.CreateAsync(newUser, request.Password);
            if (!result.Succeeded)
            {
                return new BaseApiResponse
                {
                    statusCode = StatusCodes.Status500InternalServerError,
                    message = "User registration failed. Please try again later."
                };
            }
            var otp = await _userManager.GenerateTwoFactorTokenAsync(newUser, TokenOptions.DefaultEmailProvider);
            var emailBody = $@"
                            <h3>{otp}</h3>
                            <p>This OTP is valid for 5 minutes. If you did not request this, please ignore this email.</p>";

            var isEmailSent = await _emailService.SendEmailAsync(newUser.Email, "Confirm Your Email Address by OTP", emailBody);
            if (isEmailSent)
            {
                return new BaseApiResponse(StatusCodes.Status200OK, "Registration successful! A confirmation email has been sent to your inbox.");
            }

            return new BaseApiResponse(StatusCodes.Status500InternalServerError, "An error occurred while sending the confirmation email.");

        }
    }
}
