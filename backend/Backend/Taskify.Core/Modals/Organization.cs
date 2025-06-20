using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Abstraction;

namespace Taskify.Core.Modals
{
    public class Organization : BaseModal
    {
        public string Name { get; set; }
        public string Slug { get; set; }
        public string Type { get; set; }
        public string ImageUrl { get; set; }

        [ForeignKey(nameof(AppUser))]
        public string UserId { get; set; }
        public AppUser User { get; set; }
        public ICollection<Project> Projects { get; set; } = new HashSet<Project>();

    }
}
