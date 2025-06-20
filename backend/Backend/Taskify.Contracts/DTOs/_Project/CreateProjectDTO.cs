using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taskify.Contracts.DTOs._Project
{
    public class CreateProjectDTO
    {
        public string Name { get; set; }
        public string Key { get; set; }
        public string Description { get; set; }
        public IFormFile LogoUrl { get; set; }
        public int OrganizationId { get; set; }
    }
}
