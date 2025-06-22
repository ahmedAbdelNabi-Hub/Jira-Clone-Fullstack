using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taskify.Contracts.DTOs._Project
{
    public class ProjectDTO
    {
        public string Name { get; set; }
        public string Key { get; set; }
        public string Slug { get; set; }
        public string Description { get; set; }
        public string LogoUrl { get; set; }
    }
}
