using abuhamza.domain;
using abuhamza.repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.business.Interface
{
    public interface ICustomerBusiness
    {
        Task<List<tblCustomer>> GetCustomers();
        Task<string> DeleteCustomer(int id);
        Task<CustomerDomainModel> GetCustomerById(int id);
        Task<string> AddUpdateCustomer(CustomerDomainModel Customer);
    }
}
