using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taskify.Contracts.DTOs._Organization
{
    public class OrganizationDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } 
        public string Slug { get; set; } 
        public string Type { get; set; } 
        public string Image { get; set; }
    }
}
