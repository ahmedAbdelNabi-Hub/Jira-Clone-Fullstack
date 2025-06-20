using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taskify.Contracts.DTOs.CustomResponses
{
    public class ErrorApiResponse : BaseApiResponse
    {
        public Dictionary<string, IEnumerable<string>> Errors { get; set; }

        public ErrorApiResponse(Dictionary<string, IEnumerable<string>> errors)
            : base(400)
        {
            Errors = errors;
        }
    }
}
