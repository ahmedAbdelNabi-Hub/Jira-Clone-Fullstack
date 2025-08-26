using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Modals;
using Domain.Modals;
using System.Reflection.Emit;

namespace Infrastructure.Configruations
{
    internal class ProjectMemberConfigruations : IEntityTypeConfiguration<ProjectMember>
    {
        public void Configure(EntityTypeBuilder<ProjectMember> builder)
        {

            builder
    .HasOne(pm => pm.Project)
    .WithMany(p => p.ProjectMembers)
    .HasForeignKey(pm => pm.ProjectId)
    .OnDelete(DeleteBehavior.Restrict); 

        }
    }
}

