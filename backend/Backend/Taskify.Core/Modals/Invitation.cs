using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Abstraction;
using Taskify.Core.Modals;

namespace Domain.Modals
{
    public class Invitation : BaseModal
    {
        public int ProjectId { get; set; }
        public Project Project { get; set; }

        public string Email { get; set; }
        public string Token { get; set; } // for verification
        public DateTime ExpiryDate { get; set; }
        public string Role {  get; set; }   
        public bool IsAccepted { get; set; } = false;

    }
}
