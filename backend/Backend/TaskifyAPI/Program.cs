
using System.Text.Json.Serialization;
using Taskify.Contracts;
using TaskifyAPI.Extensions;
using TaskifyAPI.Helper.mapper;

namespace TaskifyAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.Configure<OpenAiConfig>(builder.Configuration.GetSection("OpenAI"));
            builder.Services.Configure<GeminiConfig>(builder.Configuration.GetSection("DeepSeek"));
            builder.Services.AddHttpClient();
            builder.Services.AddAutoMapper(typeof(Mapper));
            builder.Services.AddControllers().AddJsonOptions(options =>{options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());}); 
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.ApplicationExtentions(builder.Configuration);
            builder.Services.IdentityExtentionService();
            builder.Services.JwtExtentionService(builder.Configuration);
            builder.Services.AddCorsService();
            builder.Services.AddMediatR(config => { 
            config.RegisterServicesFromAssembly(typeof(Program).Assembly);
            });
            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }


            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCors("AllowAngular");
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
