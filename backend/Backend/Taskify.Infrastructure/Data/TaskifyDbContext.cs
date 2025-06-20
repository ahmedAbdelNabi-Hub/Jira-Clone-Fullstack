using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Modals;

namespace Taskify.Infrastructure.Data
{
    public class TaskifyDbContext :IdentityDbContext
    {
        public TaskifyDbContext(DbContextOptions<TaskifyDbContext> options):base(options) {}
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<Project> Projects { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            builder.Entity<AppUser>().ToTable("AspNetUsers");

            base.OnModelCreating(builder);
        }
    }
}
