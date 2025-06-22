using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Abstraction;

namespace Taskify.Core.Modals
{
    public class Backlog : BaseModal
    {
        public string Title { get; set; } = string.Empty;

        [ForeignKey("Project")]
        public int ProjectId { get; set; }
        public Project Project { get; set; } = null!;

        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}
