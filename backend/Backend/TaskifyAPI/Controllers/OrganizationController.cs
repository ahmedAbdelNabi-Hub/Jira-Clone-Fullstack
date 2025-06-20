using Google.Apis.Auth;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Taskify.Contracts.DTOs._Organization;
using Taskify.Contracts.DTOs.CustomResponses;
using TaskifyAPI.Extensions;
using TaskifyAPI.Features.Organizations.Commands;
using TaskifyAPI.Features.Organizations.Queries;
using TaskifyAPI.Helper.Upload;

namespace TaskifyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationController : ControllerBase
    {
        private readonly ISender _mediator;
        public OrganizationController(ISender mediator)
        {
            _mediator = mediator;
        }

        [Authorize]
        [HttpPost("/api/v1/organization/create")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> Create([FromForm] CreateOrganizationDTO dto, IFormFile image)
        {
            var userId = User.GetUserId();
            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User not authenticated");

            var (uploadResult, fileName) = DocumentSettings.UploadFile(image, "organizations");
            if (fileName is null)
                return StatusCode(uploadResult.statusCode, uploadResult);

            var imageUrl = DocumentSettings.GetFileUrl("organizations", fileName, Request);

            var command = new CreateOrganizationCommand
            {
                Name = dto.Name,
                Slug = dto.Slug,
                Type = dto.Type,
                ImageUrl = imageUrl,
                UserId = userId
            };
            var result = await _mediator.Send(command);
            return StatusCode(result.statusCode, result);
        }

        [Authorize]
        [HttpGet("/api/v1/organization/by-userId")]
        public async Task<IActionResult> GetByUserId()
        {
            var userId = User.GetUserId();

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("User not authenticated");

            var result = await _mediator.Send(new GetOrganizationByUserIdQuery(userId));
            if (result == null)
                return NotFound(new BaseApiResponse(StatusCodes.Status404NotFound, "Organization not found"));

            var dto = new OrganizationDTO
            {
                Id = result.Id,
                Name = result.Name,
                Slug = result.Slug,
                Type = result.Type,
                Image = result.ImageUrl
            };
            return StatusCode(200, dto);
        }
    }
}
