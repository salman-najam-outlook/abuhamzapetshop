using abuhamza.domain;
using abuhamza.repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.business.Interface
{
    public interface ISupplierBusiness
    {
        Task<List<tblSupplier>> GetSuppliers();
        Task<string> DeleteSupplier(int id);
        Task<SupplierDomainModel> GetSupplierById(int id);
        Task<string> AddUpdateSupplier(SupplierDomainModel Supplier);
    }
}
