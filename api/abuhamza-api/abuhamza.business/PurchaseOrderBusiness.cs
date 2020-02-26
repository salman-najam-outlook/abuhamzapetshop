using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using abuhamza.business.Interface;
using abuhamza.domain;
using abuhamza.repository;
using abuhamza.repository.Infrastructure.Contract;

namespace abuhamza.business
{
    public class PurchaseOrderBusiness : IPurchaseOrderBusiness
    {
        private readonly IUnitOfWork unitOfWork;

        private readonly PurchaseOrderRepository purchaseOrderRepository;

        public PurchaseOrderBusiness(IUnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            purchaseOrderRepository = new PurchaseOrderRepository(unitOfWork);
        }

        public async Task<List<tblPurchaseOrder>> GetPurchaseOrders()
        {
            List<tblPurchaseOrder> uList = new List<tblPurchaseOrder>();
            uList = await purchaseOrderRepository.GetAll();

            return uList;
        }

        public async Task<string> DeletePurchaseOrder(int id)
        {
            string status = "";
            if (id > 0)
            {
                await purchaseOrderRepository.Delete(o => o.order_id == id);
                status = "deleted";
            }
            return status;
        }

        public async Task<PurchaseOrderDomainModel> GetPurchaseOrderById(int id)
        {
            PurchaseOrderDomainModel purchaseOrder = new PurchaseOrderDomainModel();
            var model = await purchaseOrderRepository.SingleOrDefault(o => o.order_id == id);
            if (model != null)
            {
                purchaseOrder.order_id      = model.order_id;
                purchaseOrder.date          = model.date;
                purchaseOrder.totalAmount   = model.totalAmount;
                purchaseOrder.status        = model.status;
                purchaseOrder.voucherNo     = model.voucherNo;
                purchaseOrder.sup_id        = model.sup_id;
            }
            return purchaseOrder;
        }

        public async Task<string> AddUpdatePurchaseOrder(PurchaseOrderDomainModel purchaseOrder)
        {
            string status = "";
            if (purchaseOrder.order_id > 0)
            {
                tblPurchaseOrder purchaseOrderToUpdate = await purchaseOrderRepository.SingleOrDefault(s => s.order_id == purchaseOrder.order_id);
                if (purchaseOrderToUpdate != null)
                {
                    purchaseOrderToUpdate.order_id = purchaseOrder.order_id;
                    purchaseOrderToUpdate.date = purchaseOrder.date;
                    purchaseOrderToUpdate.totalAmount = purchaseOrder.totalAmount;
                    purchaseOrderToUpdate.status = purchaseOrder.status;
                    purchaseOrderToUpdate.voucherNo = purchaseOrder.voucherNo;
                    purchaseOrderToUpdate.sup_id = purchaseOrder.sup_id;

                    await purchaseOrderRepository.Update(purchaseOrderToUpdate);
                    status = "updated";
                }
            }
            else
            {
                tblPurchaseOrder purchaseOrderToAdd = new tblPurchaseOrder();
                purchaseOrderToAdd.order_id = purchaseOrder.order_id;
                purchaseOrderToAdd.date = purchaseOrder.date;
                purchaseOrderToAdd.totalAmount = purchaseOrder.totalAmount;
                purchaseOrderToAdd.status = purchaseOrder.status;
                purchaseOrderToAdd.voucherNo = purchaseOrder.voucherNo;
                purchaseOrderToAdd.sup_id = purchaseOrder.sup_id;
                    
                await purchaseOrderRepository.Insert(purchaseOrderToAdd);
                status = "added";
            }
            return status;
        }

    }
}
