using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Taskify.Contracts.DTOs.Plan;
using Taskify.Contracts.IService;

namespace TaskifyAPI.Controllers
{
    public class PlannerController : ControllerBase
    {
        private readonly IGeminiService _geminiService;

        public PlannerController(IGeminiService geminiService)
        {
            _geminiService = geminiService;
        }

        [HttpPost("/api/plan/validate-topic")]
        public async Task<IActionResult> ValidateTopic([FromBody] string topic)
        {
         
            var result = await _geminiService.CheakTopicAsync(topic);
            return Ok(result);
        }
      
        [HttpPost("/api/plan/generate")]
        public async Task<IActionResult> Generate([FromBody] CourseRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Topic))
                return BadRequest("Course title is required.");

            var resultJson = await _geminiService.GenerateCoursePlanAsync(request.Topic);

            return Ok(resultJson);
        }
        [HttpPost("/api/plan/generate-normal")]
        public async Task<IActionResult> GenerateCoursePlan([FromBody] CourseRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Topic))
                return BadRequest("Course title is required.");

            var resultJson = await _geminiService.Generate(request.Topic);

            return Ok(resultJson);
        }
    }
}
