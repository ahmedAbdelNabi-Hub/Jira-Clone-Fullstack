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
    public class TaskAssignment: BaseModal
    {
        [ForeignKey(nameof(TaskItem))]
        public int TaskItemId { get; set; }
        public TaskItem TaskItem { get; set; }

        [ForeignKey(nameof(ProjectMember))]
        public int ProjectMemberId { get; set; }
        public ProjectMember ProjectMember { get; set; }
    }
}
