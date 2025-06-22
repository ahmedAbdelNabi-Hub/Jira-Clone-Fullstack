using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Taskify.Contracts;
using Taskify.Contracts.DTOs.Authentication;
using Taskify.Contracts.IService;
using Taskify.Core.Modals;

namespace Taskify.Services.JWT
{
    public class JwtService : IJwtService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly JwtConfig _jwt;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public JwtService(IHttpContextAccessor httpContextAccessor, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, IOptions<JwtConfig> jwt)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _jwt = jwt.Value;
            _httpContextAccessor = httpContextAccessor;
        }


        public async Task<AuthResponse> CreateJwtToken(AppUser user)
        {
            var claims = await setClaims(user);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: claims,
                expires: DateTime.Now.AddHours(_jwt.Expiration),
                signingCredentials: creds
            );

            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
            var refreshToken = GenerateRefreshToken();

            _httpContextAccessor.HttpContext?.Response.Cookies.Append("jwt", jwtToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true, 
                SameSite = SameSiteMode.None, 
                Expires = DateTimeOffset.UtcNow.AddHours(_jwt.Expiration),
                Path = "/"
            });


            return new AuthResponse
            {
                statusCode = 200,
                Token = jwtToken,
                RefreshToken = refreshToken
            };
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        private async Task<List<Claim>> setClaims(AppUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var userRoles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();

            foreach (var role in userRoles)
            {
                var roleClaim = new Claim(ClaimTypes.Role, role);
                roleClaims.Add(roleClaim);
            }

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName!),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!),
                new Claim("uid", user.Id)
            };

            claims.AddRange(userClaims);
            claims.AddRange(roleClaims);

            return claims;
        }
    }
}
