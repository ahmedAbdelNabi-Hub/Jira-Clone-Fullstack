using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taskify.Contracts.IService
{
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(string emailTo, string subject, string body, IList<IFormFile> attachments = null);

    }
}
