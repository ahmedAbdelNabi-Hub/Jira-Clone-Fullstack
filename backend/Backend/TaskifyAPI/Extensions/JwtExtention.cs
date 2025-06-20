using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Taskify.Contracts.IService;
using Taskify.Contracts;
using Taskify.Services.JWT;

namespace TaskifyAPI.Extensions
{
    public static class JwtExtention
    {
        public static IServiceCollection JwtExtentionService(this IServiceCollection Services, IConfiguration Configuration)
        {

            Services.Configure<JwtConfig>(Configuration.GetSection("JwtConfig"));
            Services.AddScoped<IJwtService, JwtService>();

            Services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    ValidIssuer = Configuration["JwtConfig:Issuer"],
                    ValidAudience = Configuration["JwtConfig:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtConfig:Key"]!)),

                };
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var jwt = context.Request.Cookies["jwt"];
                        if (!string.IsNullOrEmpty(jwt))
                        {
                            context.Token = jwt;
                        }
                        return Task.CompletedTask;
                    }
                };

            });

            return Services;
        }

    }
}
