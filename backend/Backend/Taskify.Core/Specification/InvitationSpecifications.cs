using Domain.Modals;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Specification;

namespace Domain.Specification
{
    public class InvitationSpecifications : BaseSpecifications<Invitation>
    {
        public InvitationSpecifications(string  token)
        {
            AddCriteria(i=>i.Token==token);
        }

    }
}
