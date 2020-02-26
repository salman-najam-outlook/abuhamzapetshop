using abuhamza.repository.Infrastructure;
using abuhamza.repository.Infrastructure.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.repository
{
    public class CustomerRepository : BaseRepository<tblCustomer>
    {
        public CustomerRepository(IUnitOfWork unitOfWork) : base(unitOfWork) { }
    }
}
