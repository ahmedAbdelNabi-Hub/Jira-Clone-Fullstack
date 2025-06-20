using MediatR;
using Microsoft.AspNetCore.Identity;
using Taskify.Contracts.DTOs.CustomResponses;
using Taskify.Contracts.IService;
using Taskify.Core.Modals;
using TaskifyAPI.Features.Authentication.Commands;
using TaskifyAPI.Features.Authentication.Queries;

public class ConfirmEmailCommandHandler : IRequestHandler<ConfirmEmailCommand, BaseApiResponse>
{
    private readonly IMediator _mediator;
    private readonly UserManager<AppUser> _userManager;
    private readonly IJwtService _jwtService;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ConfirmEmailCommandHandler(
        IMediator mediator,
        UserManager<AppUser> userManager,
        IJwtService jwtService,
        IHttpContextAccessor httpContextAccessor)
    {
        _mediator = mediator;
        _userManager = userManager;
        _jwtService = jwtService;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<BaseApiResponse> Handle(ConfirmEmailCommand request, CancellationToken cancellationToken)
    {
        var user = await _mediator.Send(new GetUserByEmailQuery(request.Email));
        if (user is null)
        {
            return new BaseApiResponse(StatusCodes.Status400BadRequest, "Email does not exist");
        }

        var isOtpValid = await _userManager.VerifyTwoFactorTokenAsync(user, TokenOptions.DefaultEmailProvider, request.OTP);
        if (!isOtpValid)
        {
            return new BaseApiResponse(StatusCodes.Status400BadRequest, "Invalid or expired OTP");
        }

        user.EmailConfirmed = true;
        var updateResult = await _userManager.UpdateAsync(user);

        if (!updateResult.Succeeded)
        {
            return new BaseApiResponse(StatusCodes.Status500InternalServerError, "Failed to confirm email");
        }

        var jwtResponse = await _jwtService.CreateJwtToken(user);

        return jwtResponse;
    }
}
