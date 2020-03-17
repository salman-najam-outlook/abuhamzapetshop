using System;
using System.Data;
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
        private readonly DetailOrderRepository detailOrderRepository;

        public PurchaseOrderBusiness(IUnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            purchaseOrderRepository = new PurchaseOrderRepository(unitOfWork);

            detailOrderRepository = new DetailOrderRepository(unitOfWork);

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
                purchaseOrder.supplier        = model.sup_id;
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
                    await purchaseOrderRepository.Update(purchaseOrderToUpdate);
                    status = "updated";
                }
            }
            else
            {
                List<DetailOrderDomainModel> detailOrder = new List<DetailOrderDomainModel>();
                detailOrder = purchaseOrder.orderDetails;
                string strVchNo = "";
                string strOrderDesc = "";
                int vrNo = 0;

                tblPurchaseOrder purchaseOrderToAdd = new tblPurchaseOrder();

                int lastOrderId = 0;

                using (abuhamzapetstoreEntities db = new abuhamzapetstoreEntities())
                {
                    try
                    {
                        vrNo = (from c in db.tblvches
                                orderby c.vch_id descending
                                select c.vch_id).Take(1).SingleOrDefault();

                        strVchNo = "0000" + (vrNo + 1);

                        strOrderDesc = purchaseOrder.description;
                        if (purchaseOrder.description == null)
                        {
                            strOrderDesc = "";
                        }

                        var result = db.stpPurchaseOrder(1, purchaseOrder.totalAmount, purchaseOrder.paidAmount,
                            strOrderDesc, purchaseOrder.supplier, purchaseOrder.paidAmount, strVchNo,1,purchaseOrder.creditorAcc_Id);

                        lastOrderId = (from c in db.tblPurchaseOrders
                                                               orderby c.order_id descending
                                                               select c.order_id).Take(1).SingleOrDefault();

                        tblDetailOrder detailOrderToAdd = new tblDetailOrder();
                        foreach (DetailOrderDomainModel singleDetail in detailOrder)
                        {
                            result = db.stpDetailOrder(lastOrderId, singleDetail.quantity, singleDetail.barcode,
                                singleDetail.purchasePrice, strVchNo);
                        }

                    }
                    catch (Exception ex)
                    {
                        status = ex.Message;
                    }
                }
                status = "added";
            }
            return status;
        }

    }
}
