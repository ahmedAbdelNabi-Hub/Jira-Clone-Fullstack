using System.Security.Claims;

namespace TaskifyAPI.Extensions
{
    public static class HttpContextExtensions
    {
        public static string? GetUserId(this ClaimsPrincipal user)
        {
            return user?.FindFirst("uid")?.Value ?? user?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}
