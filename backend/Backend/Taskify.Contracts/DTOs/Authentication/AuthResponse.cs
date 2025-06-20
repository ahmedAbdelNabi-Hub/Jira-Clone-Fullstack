using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Contracts.DTOs.CustomResponses;

namespace Taskify.Contracts.DTOs.Authentication
{
    public class AuthResponse : BaseApiResponse
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public DateTime Expiration { get; set; } = DateTime.MinValue;
    }
}
