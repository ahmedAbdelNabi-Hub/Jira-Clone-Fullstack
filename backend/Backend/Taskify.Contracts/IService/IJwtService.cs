using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Contracts.DTOs.Authentication;
using Taskify.Core.Modals;

namespace Taskify.Contracts.IService
{
    public interface IJwtService
    {
        Task<AuthResponse> CreateJwtToken(AppUser user);
        string GenerateRefreshToken();

    }
}
