using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Abstraction;
using Taskify.Core.Interface.Repositories;
using Taskify.Core.Interface.Specification;
using Taskify.Infrastructure.Data;

namespace Taskify.Infrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseModal
    {
        private readonly TaskifyDbContext _dbContext;

        public GenericRepository(TaskifyDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task AddAsync(T entity)
        {
            await _dbContext.Set<T>().AddAsync(entity);
        }

        public Task DeleteAsync(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
            return Task.CompletedTask;
        }

        public  Task UpdateAsync(T entity)
        {
            var entry = _dbContext.Entry(entity);

            // Check if the entity is already tracked
            var local = _dbContext.Set<T>().Local.FirstOrDefault(e => e.Id.Equals(entity.Id));
            if (local != null)
            {
                // Detach the local instance to avoid duplicate tracking
                _dbContext.Entry(local).State = EntityState.Detached;
            }

            // Attach and mark entity as modified
            _dbContext.Attach(entity);
            entry.State = EntityState.Modified;

            // Optional: Only update scalar properties (not navigation)
            foreach (var navigation in entry.Navigations)
            {
                if (navigation.Metadata.IsCollection)
                {
                    // Don't modify collection navigations here
                    continue;
                }

                if (navigation.CurrentValue != null)
                {
                    _dbContext.Entry(navigation.CurrentValue).State = EntityState.Unchanged;
                }
            }

            return Task.CompletedTask;
        }


        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }

        public async Task<T> GetByIdSpecAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }

        public async Task<IReadOnlyList<T>> GetAllWithSpecAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).AsNoTracking().ToListAsync();
        }

        public async Task<IReadOnlyList<T>> GetAllAsync()
        {
            return await _dbContext.Set<T>().AsNoTracking().ToListAsync();
        }

        public async Task<int> CountWithSpec(ISpecification<T> spec)
        {
            ArgumentNullException.ThrowIfNull(spec);
            return await ApplySpecification(spec).CountAsync();
        }
        public IQueryable<T> GetQueryableWithSpec(ISpecification<T> spec)
        {
            return ApplySpecification(spec);
        }
        public async Task<List<TResult>> GetProjectedAsync<TResult>(Expression<Func<T, TResult>> selector, ISpecification<T> spec)
        {
            ArgumentNullException.ThrowIfNull(selector);
            ArgumentNullException.ThrowIfNull(spec);

            return await ApplySpecification(spec)
                         .AsNoTracking()
                         .Select(selector)
                         .ToListAsync();
        }

        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            ArgumentNullException.ThrowIfNull(spec);
            return SpecificationsEvaluator<T>.GetQuery(_dbContext.Set<T>(), spec);
        }

        public  Task DeleteRangeAsync(IEnumerable<T> entities)
        {
            _dbContext.RemoveRange(entities);
            return Task.CompletedTask;

        }

    }
}
