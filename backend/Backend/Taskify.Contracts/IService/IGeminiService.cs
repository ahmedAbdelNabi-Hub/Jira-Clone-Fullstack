using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taskify.Contracts.IService
{
    public interface IGeminiService
    {
        Task<string> CheakTopicAsync(string userInput);
        Task<string> GenerateCoursePlanAsync(string courseTitle);
        Task<string> Generate(string courseTitle);
    }
}
