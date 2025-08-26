using Domain.Modals;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Configruations
{
    public class TaskAssignmentConfigruations : IEntityTypeConfiguration<TaskAssignment>
    {
        public void Configure(EntityTypeBuilder<TaskAssignment> builder)
        {

                  builder
                  .HasOne(ta => ta.TaskItem)
                  .WithMany(t => t.TaskAssignments)
                  .HasForeignKey(ta => ta.TaskItemId)
                  .OnDelete(DeleteBehavior.Restrict);

                   builder
                   .HasOne(ta => ta.ProjectMember)
                   .WithMany(pm => pm.TaskAssignments)
                   .HasForeignKey(ta => ta.ProjectMemberId)
                   .OnDelete(DeleteBehavior.Restrict); 

        }
    }
}
