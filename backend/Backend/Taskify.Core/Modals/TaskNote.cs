using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Abstraction;
using Taskify.Core.Modals;

namespace Domain.Modals 
{
    public class TaskNote : BaseModal
    {
        public int TaskItemId { get; set; }
        public TaskItem TaskItem { get; set; } = null!;
        public string UserId { get; set; }
        public string Content { get; set; } = string.Empty;
    }
}
