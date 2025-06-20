using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Abstraction;

namespace Taskify.Core.Modals
{
    public class Project : BaseModal
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Key { get; set; } 

        [Required]
        public string Slug { get; set; }

        public string Description { get; set; }

        public string LogoUrl { get; set; }

        [Required]
        public int OrganizationId { get; set; }
        public Organization Organization { get; set; }
    }
}
