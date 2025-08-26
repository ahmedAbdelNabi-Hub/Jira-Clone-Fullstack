using Domain.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Abstraction;
using Taskify.Core.Enums;

namespace Taskify.Core.Modals
{
    public class TaskItem : BaseModal
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public WorkItemStatus Status { get; set; } = WorkItemStatus.ToDo;
        public TaskType Type { get; set; } = TaskType.Task;
        public TaskPriority Priority { get; set; } = TaskPriority.Low;
        public int? SprintId { get; set; }
        public Sprint? Sprint { get; set; }
        public int? BacklogId { get; set; }
        public Backlog? Backlog { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; } = null!;
        public ICollection<TaskAssignment> TaskAssignments { get; set; }
        public ICollection<TaskNote> Notes { get; set; } = new List<TaskNote>();


    }
}
