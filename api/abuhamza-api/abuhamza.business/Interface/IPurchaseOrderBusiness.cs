using abuhamza.domain;
using abuhamza.repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.business.Interface
{
    public interface IPurchaseOrderBusiness
    {
        Task<List<tblPurchaseOrder>> GetPurchaseOrders();
        Task<string> DeletePurchaseOrder(int id);
        Task<PurchaseOrderDomainModel> GetPurchaseOrderById(int id);
        Task<string> AddUpdatePurchaseOrder(PurchaseOrderDomainModel PurchaseOrder);
    }
}
