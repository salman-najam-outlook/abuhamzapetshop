using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using abuhamza.repository.Infrastructure;
using abuhamza.repository.Infrastructure.Contract;

namespace abuhamza.repository
{
    public class AccountRepository : BaseRepository<tblAccount>
    {
        public AccountRepository(IUnitOfWork unitOfWork) : base(unitOfWork) { }
    }
}
