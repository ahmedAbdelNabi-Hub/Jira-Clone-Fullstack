using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.DTOs._Project
{
    public class UpdateProjectDTO
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string Key { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
        public IFormFile? LogoFile { get; set; }
    }
}
