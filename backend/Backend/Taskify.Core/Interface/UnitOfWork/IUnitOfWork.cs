using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Abstraction;
using Taskify.Core.Interface.Repositories;

namespace Taskify.Core.Interface.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        Task BeginTransactionAsync();
        Task<bool> CommitAsync();
        Task RollbackAsync();
        Task<int> SaveChangeAsync(CancellationToken cancellationToken = default);
        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseModal;

    }
}
