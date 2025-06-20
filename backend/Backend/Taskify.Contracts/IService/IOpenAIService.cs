using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taskify.Contracts.IService
{
    public interface IOpenAIService
    {
        Task<string> CheckPlanCourse(string text);
    }
}
