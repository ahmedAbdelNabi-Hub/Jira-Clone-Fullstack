using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Taskify.Contracts.DTOs._Project;
using TaskifyAPI.Features.Projects.Commands;
using static System.Net.Mime.MediaTypeNames;
using TaskifyAPI.Helper.Upload;
using TaskifyAPI.Extensions;
using TaskifyAPI.Features.Organizations.Queries;
using Taskify.Contracts.DTOs.CustomResponses;
using TaskifyAPI.Features.Projects.Queries;

namespace TaskifyAPI.Controllers
{
    [Authorize]
    [Route("/api/v1/project")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ISender _mediator;

        public ProjectController(ISender mediator)
        {
            _mediator = mediator;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> CreateProject([FromForm] CreateProjectDTO dto)
        {
            var userId = User.GetUserId(); 
            if (string.IsNullOrEmpty(userId))
                return Unauthorized(new BaseApiResponse(401, "User not authenticated"));

            var organization = await _mediator.Send(new GetOrganizationByUserIdQuery(userId));
            if (organization == null)
                return NotFound(new BaseApiResponse(404, "organization not found"));

            var (uploadResult, fileName) = DocumentSettings.UploadFile(dto.LogoUrl, "projects");
            if (fileName is null)
                return StatusCode(uploadResult.statusCode, uploadResult);

            var imageUrl = DocumentSettings.GetFileUrl("projects", fileName, Request);

            var command = new CreateProjectCommand(
                dto.Name,
                dto.Key,
                dto.Description,
                imageUrl,
                organization.Id 
            );

            var result = await _mediator.Send(command);
            return StatusCode(result.statusCode, result);
        }

        [Authorize]
        [HttpGet("org/{orgId}")]
        public async Task<IActionResult> GetAllProjects(int orgId)
        {
            var result = await _mediator.Send(new GetAllProjectQuary(orgId));

            if (!result.Any())
                return NotFound( new BaseApiResponse(StatusCodes.Status404NotFound,"No projects found for the organization."));
            return Ok(result);
        }
    }
}
