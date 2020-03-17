using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using abuhamza.domain;
using abuhamza.repository;

namespace abuhamza.business.Interface
{
    public interface IDetailOrderBusiness
    {
        Task<List<tblDetailOrder>> GetDetailOrders();
        Task<string> DeleteDetailOrder(int id);
        Task<DetailOrderDomainModel> GetDetailOrderById(int id);
        Task<string> AddUpdateDetailOrder(DetailOrderDomainModel DetailOrder);
    }
}
