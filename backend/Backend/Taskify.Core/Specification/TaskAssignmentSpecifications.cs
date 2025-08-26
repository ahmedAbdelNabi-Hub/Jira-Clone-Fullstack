using Domain.Modals;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Specification;

namespace Domain.Specification
{
    public class TaskAssignmentSpecifications : BaseSpecifications<TaskAssignment>
    {
        public TaskAssignmentSpecifications(string userId)
        {
            AddCriteria(t => t.ProjectMember.UserId == userId);
            AddInclude(t => t.ProjectMember);
        }
    }
}
