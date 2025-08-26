using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Abstraction;
using Taskify.Core.Enums;

namespace Taskify.Core.Modals
{
    public class Sprint : BaseModal
    {
        public string Name { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public SprintStatus Status { get; set; } = SprintStatus.NotStarted;

        [ForeignKey("Project")]
        public int ProjectId { get; set; }
        public Project Project { get; set; } = null!;
        public string Goal { get; set; }

        public ICollection<TaskItem>? Tasks { get; set; } = new List<TaskItem>();
    }
}
