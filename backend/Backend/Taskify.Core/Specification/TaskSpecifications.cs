using Domain.Specification.Helper;
using Domain.Specification.QueryParameters;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Enums;
using Taskify.Core.Interface.Specification;
using Taskify.Core.Modals;
using Taskify.Core.Specification;

namespace Domain.Specification
{
    public class TaskSpecifications : BaseSpecifications<TaskItem>
    {
        public TaskSpecifications()
        {
            
        }
        public TaskSpecifications( int? taskId = null) 
        {
            if (taskId.HasValue)
            {
                AddCriteria(t => t.Id == taskId.Value);
                AddIncludeExpression(query =>query.Include(t => t.TaskAssignments).ThenInclude(ta => ta.ProjectMember));
            }

        }
        public TaskSpecifications(int projectId , TaskFilterParameters filter)
        {
            Expression<Func<TaskItem, bool>> criteria = t => t.ProjectId == projectId && (t.Sprint!.Status == SprintStatus.Started);
            if (filter.AssignedUserId!=null)
            {
                criteria = criteria.And(t => t.TaskAssignments.Any(ta => ta.ProjectMember.UserId == filter.AssignedUserId));
                AddIncludeExpression(q => q.Include(t => t.TaskAssignments).ThenInclude(ta => ta.ProjectMember));
            }

            if(filter.Search != null)
            {
                criteria = criteria.And(t => t.Title.Contains(filter.Search));
            }

            if (filter.Statuses?.Any() == true)
            {
                criteria = criteria.And(t => filter.Statuses.Contains(t.Status));
            }

            if (filter.Priorities?.Any() == true)
            {
                criteria = criteria.And(t => filter.Priorities.Contains(t.Priority));
            }

            if (filter.Types?.Any() == true)
            {
                criteria = criteria.And(t => filter.Types.Contains(t.Type));
            }
             AddCriteria(criteria);
             AddInclude(t => t.Sprint!);
            
        }

    }
}
