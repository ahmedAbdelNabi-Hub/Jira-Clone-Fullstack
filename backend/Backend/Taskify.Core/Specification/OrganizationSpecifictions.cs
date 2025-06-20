using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Modals;

namespace Taskify.Core.Specification
{
    public class OrganizationSpecifictions : BaseSpecifications<Organization>
    {
        public OrganizationSpecifictions()
        {
            
        }
        public OrganizationSpecifictions(string userId)
        {
            AddCriteria(o=>o.UserId == userId);
        }
    }
}
