using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using abuhamza.repository.Infrastructure;
using abuhamza.repository.Infrastructure.Contract;

namespace abuhamza.repository
{
    public class MainCategoryRepository : BaseRepository<tblMainCategory>
    {
        public MainCategoryRepository(IUnitOfWork unitOfWork) : base(unitOfWork) { }
    }
}
