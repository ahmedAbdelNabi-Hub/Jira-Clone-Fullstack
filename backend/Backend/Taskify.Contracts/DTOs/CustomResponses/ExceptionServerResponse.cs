using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Taskify.Contracts.DTOs.CustomResponses
{
    public class ExceptionServerResponse : BaseApiResponse
    {
        public string? details { get; set; }
        public ExceptionServerResponse(string? massage = null, string? Details = null) : base((int)HttpStatusCode.InternalServerError, massage)
        {
            details = Details;
        }
    }
}
