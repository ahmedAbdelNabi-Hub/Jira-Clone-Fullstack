using Microsoft.EntityFrameworkCore;
using Taskify.Contracts.IService;
using Taskify.Core.Interface.Repositories;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Infrastructure.Data;
using Taskify.Infrastructure.Repositories;
using Taskify.Infrastructure.UnitOfWork;
using Taskify.Services.Email;


namespace TaskifyAPI.Extensions
{
    public static class ApplicationExtention
    {
        public static IServiceCollection ApplicationExtentions(this IServiceCollection services, IConfiguration configuration)
        {

            services.AddDbContext<TaskifyDbContext>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IGeminiService, GeminiService>();
            return services;    
        }
    }
}
