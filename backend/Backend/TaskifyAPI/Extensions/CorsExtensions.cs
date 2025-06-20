namespace TaskifyAPI.Extensions
{
    public static class CorsExtensions
    {
        public static IServiceCollection AddCorsService(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAngular",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:4200", "https://localhost:4200") 
                              .AllowAnyMethod()
                              .AllowAnyHeader()
                              .AllowCredentials(); 
                    });
            });

            return services;
        }
    }

}
