using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Modals;

namespace Taskify.Core.Specification
{
    public class SprintSpecifications : BaseSpecifications<Sprint>
    {
        public SprintSpecifications(int? sprintId = null, int? projectId = null)
        {
            if (sprintId.HasValue)
            {
                AddCriteria(s => s.Id == sprintId.Value);
                AddIncludeExpression(query =>query.Include(t => t.Tasks)!.ThenInclude(ta => ta.TaskAssignments));
            }
      

            if (projectId.HasValue)
                AddCriteria(s => s.ProjectId == projectId.Value);

            AddInclude(s => s.Tasks!);
        }


    }
}
