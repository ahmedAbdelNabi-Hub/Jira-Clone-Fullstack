using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Taskify.Core.Abstraction;
using Taskify.Core.Interface.Repositories;
using Taskify.Core.Interface.UnitOfWork;
using Taskify.Infrastructure.Data;
using Taskify.Infrastructure.Repositories;

namespace Taskify.Infrastructure.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {

        private IDbContextTransaction _transaction;
        private TaskifyDbContext _dbContext;
        private Dictionary<string, object> repositories;

        public UnitOfWork(TaskifyDbContext dbContext)
        {
            _dbContext = dbContext;
            repositories = new Dictionary<string, object>();
        }

        public async Task BeginTransactionAsync()
        {
            _transaction = await _dbContext.Database.BeginTransactionAsync();
        }
        public async Task<bool> CommitAsync()
        {
            try
            {
                await _transaction.CommitAsync();
                return true;
            }
            catch
            {
                await _transaction.RollbackAsync();
                return false;
            }
            finally
            {
                await _transaction.DisposeAsync();
                _transaction = null!;
            }

        }
        public async Task RollbackAsync()
        {
            if (_transaction != null)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                await _transaction.DisposeAsync();
                _transaction = null!;
            }
        }
        public async Task<int> SaveChangeAsync(CancellationToken cancellationToken = default)
        {
            return await _dbContext.SaveChangesAsync(cancellationToken);
        }
        public void Dispose()
        {
            _dbContext.Dispose();
        }
        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseModal
        {
            var nameEntity = typeof(TEntity).Name;
            if (!repositories.ContainsKey(nameEntity))
            {
                var typeEntity = typeof(GenericRepository<>);
                var Instance = Activator.CreateInstance(typeEntity.MakeGenericType(typeof(TEntity)), _dbContext);
                repositories.Add(nameEntity, Instance!);
            }
            return (IGenericRepository<TEntity>)repositories[nameEntity];
        }
    }
}
