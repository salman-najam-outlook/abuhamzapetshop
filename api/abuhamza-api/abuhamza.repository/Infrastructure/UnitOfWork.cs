using abuhamza.repository.Infrastructure.Contract;
using System.Data.Entity;

namespace abuhamza.repository.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly abuhamzapetstoreEntities _dbContext;

        public UnitOfWork()
        {
            _dbContext = new abuhamzapetstoreEntities();
        }

        public DbContext Db
        {
            get { return _dbContext; }
        }

        public void Dispose()
        {
        }
    }

}

