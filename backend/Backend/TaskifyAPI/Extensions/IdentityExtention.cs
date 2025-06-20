using Microsoft.AspNetCore.Identity;
using Taskify.Core.Modals;
using Taskify.Infrastructure.Data;

namespace TaskifyAPI.Extensions
{
    public static class IdentityExtention
    {
        public static IServiceCollection IdentityExtentionService(this IServiceCollection services)
        {
            services.AddIdentity<AppUser, IdentityRole>(options =>
            {
                options.SignIn.RequireConfirmedEmail = true;
                options.Tokens.EmailConfirmationTokenProvider = TokenOptions.DefaultProvider;
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;

            })
            .AddEntityFrameworkStores<TaskifyDbContext>()
            .AddDefaultTokenProviders();

            services.Configure<DataProtectionTokenProviderOptions>(options => {
                options.TokenLifespan = TimeSpan.FromHours(1);
            });

            return services;
        }
    }
}
