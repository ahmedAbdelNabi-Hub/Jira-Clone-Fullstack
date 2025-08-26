using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Enums;

namespace Domain.Specification.QueryParameters
{
    public class TaskFilterParameters
    {
 
        public string? AssignedUserId { get; set; }
        public List<WorkItemStatus>? Statuses { get; set; }
        public List<TaskPriority>? Priorities { get; set; }
        public List<TaskType>? Types { get; set; }
        public string? Search { get ; set; }
    }
}
