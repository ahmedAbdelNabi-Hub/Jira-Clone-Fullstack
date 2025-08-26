using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Contracts.DTOs.Task;

namespace Taskify.Contracts.DTOs._Sprint
{
    public class SprintDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public int ProjectId { get; set; }
        public IList<TaskItemDTO> Tasks { get; set; } = new List<TaskItemDTO>();
    }
}
