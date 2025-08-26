using Domain.Modals;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Modals;
using Taskify.Core.Specification;

namespace Domain.Specification
{
    public class ProjectMemberSpecifications : BaseSpecifications<ProjectMember>
    {
        public ProjectMemberSpecifications()
        {
            
        }

        public ProjectMemberSpecifications(string UserId , int projectId)
        {
            AddCriteria(m => m.UserId == UserId && m.ProjectId == projectId);
        }

        public ProjectMemberSpecifications(int? projectId = null , int? organizationId=null)
        {
            if (projectId.HasValue) {
                AddCriteria(pm => pm.ProjectId == projectId);
            }

            if (organizationId.HasValue) {
                AddCriteria(pm =>
                           (pm.Role == "Owner" || pm.Role == "Member") &&
                           pm.Project.OrganizationId == organizationId);
            }
        }

       

        public ProjectMemberSpecifications(int projectId , List<string> assigneeIds)
        {
            AddCriteria(pm=>pm.ProjectId==projectId && assigneeIds.Contains(pm.UserId));
        }

        public ProjectMemberSpecifications(string UserId)
        {
            AddCriteria(m => m.UserId == UserId);
            
        }

        public ProjectMemberSpecifications getOwendProjectMember(string UserId)
        {
            AddCriteria(p => p.UserId == UserId && p.Role == "Owner");
            return this;
        }

        
    }
}
