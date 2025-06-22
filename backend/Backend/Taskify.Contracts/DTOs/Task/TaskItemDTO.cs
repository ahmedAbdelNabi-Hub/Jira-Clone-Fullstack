using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Taskify.Contracts.DTOs.Task
{
    public class TaskItemDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int Status { get; set; } 
        public int Type { get; set; }
        public int Priority { get; set; }
        public int? SprintId { get; set; }
        public int? BacklogId { get; set; }
        public int ProjectId { get; set; }
        public string ProjectName { get; set; } = string.Empty;
    }
}
