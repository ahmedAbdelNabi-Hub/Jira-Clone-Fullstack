using Contracts.DTOs.Member;
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
        public string? SprintName { get; set; }
        public DateTime? SprintStartDate { get; set; }
        public DateTime? SprintEndDate { get; set; }
       
        public int CountComment { get; set; } 
        public List<MemberDTO> AssignedUsers { get; set; }


    }
}
