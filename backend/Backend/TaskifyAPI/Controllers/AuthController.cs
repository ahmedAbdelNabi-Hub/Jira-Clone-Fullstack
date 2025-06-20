using AutoMapper;
using Google.Apis.Auth;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Taskify.Contracts.DTOs.Authentication;
using Taskify.Contracts.DTOs.CustomResponses;
using TaskifyAPI.Features.Authentication.Commands;
using TaskifyAPI.Features.Authentication.Queries;

namespace TaskifyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ISender _sender;
        private readonly GoogleJsonWebSignature.ValidationSettings _validationSettings;

        public AuthController( ISender sender)
        {
            _sender=sender;
            _validationSettings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new string[] { "810583915097-vgf50ast4vi6i0fg4aaolahm57k5t5k2.apps.googleusercontent.com" }
            };
        }

        [HttpPost]
        [Route("/api/v1/auth/login")]
        [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(BaseApiResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BaseApiResponse>> login([FromBody] LoginDTO loginDTO)
        {
            var responseFromSender = await _sender.Send(new LoginUserQuery(loginDTO.Email, loginDTO.Password));
            return HandleStatusCode(responseFromSender);
        }
        [HttpPost]
        [Route("/api/v1/auth/register")]
        [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(BaseApiResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BaseApiResponse>> register([FromForm] UserRegistrationDTO registrationDTO )
        {
            var responseFromSender = await _sender.Send(new RegisterUserCommand(registrationDTO));
            return HandleStatusCode(responseFromSender);
        }
        [HttpPost]
        [Route("/api/v1/auth/google-login")]
        [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(BaseApiResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BaseApiResponse>> LoginWithGoogle([FromQuery] string TokenId)
        {

            var payload = await GoogleJsonWebSignature.ValidateAsync(TokenId, _validationSettings);
            if (payload == null)
            {
                return new BaseApiResponse(StatusCodes.Status400BadRequest, "Invalid Google Token");
            }
            var responseFromQuary = await _sender.Send(new GoogleLoginQuery(payload));
            if (responseFromQuary.statusCode == StatusCodes.Status200OK) return HandleStatusCode(responseFromQuary);
            var responseFromCommend = await _sender.Send(new RegisterWithGoogleCommand(payload));
            if (responseFromCommend.statusCode == StatusCodes.Status200OK) return HandleStatusCode(responseFromCommend);
            return new BaseApiResponse(StatusCodes.Status500InternalServerError, "An error occurred during login or registration.");

        }

        [HttpPost("/api/v1/auth/register-google")]
        [ProducesResponseType(typeof(AuthResponse), 200)]
        [ProducesResponseType(typeof(BaseApiResponse), 400)]
        [ProducesResponseType(typeof(BaseApiResponse), 500)]
        public async Task<IActionResult> RegisterWithGoogle([FromQuery] string tokenId)
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(tokenId, _validationSettings);
            if (payload == null)
            {
                return BadRequest(new BaseApiResponse(400, "Invalid Google token"));
            }
            var user = await _sender.Send(new GetUserByEmailQuery(payload.Email));
            if (user != null)
            {
                return BadRequest(new BaseApiResponse { statusCode = StatusCodes.Status404NotFound, message = "User with this email already exists." });
            }

            var result = await _sender.Send(new RegisterWithGoogleCommand(payload));
            if (result.statusCode >= 200 && result.statusCode < 300)
            {
                return Ok(result);
            }
            return StatusCode(result.statusCode, result.message);

        }

        [HttpPost]
        [Route("/api/v1/auth/confirm-email")]
        [ProducesResponseType(typeof(AuthResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(BaseApiResponse), StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BaseApiResponse>> ConfirmEmail([FromBody] ConfirmEmailCommand command)
        {

            var response = await _sender.Send(command);
            if (response.statusCode != StatusCodes.Status200OK)
                return StatusCode(response.statusCode, response);

            return HandleStatusCode(response);
        }


        [Authorize]
        [HttpGet]
        [Route("/api/v1/auth/current-user")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var email = User.FindFirstValue(ClaimTypes.Email); 

            if (string.IsNullOrEmpty(email))
                return Unauthorized(new BaseApiResponse(404, "Email claim not found"));

            var user = await _sender.Send(new GetUserByEmailQuery(email)); 
            if (user == null)
                return NotFound(new BaseApiResponse(404, "User Not Fount"));

            return Ok(new
            {
                user.Id,
                user.FullName,
                user.Email,
                user.ProfileImage,
            });
        }


    private ActionResult<BaseApiResponse> HandleStatusCode(BaseApiResponse authResponse)
        {
            return authResponse.statusCode switch
            {
                200 => Ok(authResponse),
                201 => Created(string.Empty, authResponse),
                400 => BadRequest(authResponse),
                401 => Unauthorized(authResponse),
                403 => Forbid(),
                404 => NotFound(authResponse),
                500 => StatusCode(500, authResponse),
                _ => StatusCode(authResponse.statusCode, authResponse)
            };
        }
    }
}
