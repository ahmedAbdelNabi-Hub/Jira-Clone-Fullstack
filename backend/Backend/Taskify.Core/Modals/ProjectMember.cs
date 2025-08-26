using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Abstraction;
using Taskify.Core.Modals;

namespace Domain.Modals
{
    public class ProjectMember : BaseModal
    {

        [ForeignKey(nameof(AppUser))]
        public string UserId { get; set; } 
        public AppUser User { get; set; }

        [ForeignKey(nameof(Project))]
        public int ProjectId { get; set; }
        public Project Project { get; set; }
        public string Role { get; set; }
        public ICollection<TaskAssignment> TaskAssignments { get; set; }

    }
}
