using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Modals;

namespace Taskify.Core.Specification
{
    public class ProjectSpecifications : BaseSpecifications<Project>
    {
        public ProjectSpecifications() { }
        public ProjectSpecifications(int orgId)
        {
            AddCriteria(p=>p.OrganizationId==orgId);
        }
    }
}
