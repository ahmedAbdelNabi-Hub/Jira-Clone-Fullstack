using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Abstraction;
using Taskify.Core.Interface.Specification;

namespace Taskify.Core.Interface.Repositories
{
    public interface IGenericRepository<T> where T : BaseModal
    {

        Task<IReadOnlyList<T>> GetAllWithSpecAsync(ISpecification<T> Spec);
        Task<T> GetByIdSpecAsync(ISpecification<T> Spec);

        Task<List<TResult>> GetProjectedAsync<TResult>(Expression<Func<T, TResult>> selector, ISpecification<T> spec);
        Task<IReadOnlyList<T>> GetAllAsync();
        IQueryable<T> GetQueryableWithSpec(ISpecification<T> spec);
        Task<T> GetByIdAsync(int id);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task<int> CountWithSpec(ISpecification<T> Spec);

    }
}
