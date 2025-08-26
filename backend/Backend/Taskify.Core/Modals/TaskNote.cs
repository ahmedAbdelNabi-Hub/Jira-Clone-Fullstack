using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Abstraction;

namespace Domain.Modals
{
    public class TaskNote : BaseModal
    {
        public int TaskItemId { get; set; }
        public TaskItem TaskItem { get; set; } = null!;

        // Who wrote the note
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        // Note content (support markdown/bear format)
        public string Content { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
    }
}
