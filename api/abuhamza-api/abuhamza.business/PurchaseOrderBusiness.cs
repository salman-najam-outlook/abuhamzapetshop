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
                    purchaseOrderToUpdate.order_id = purchaseOrder.order_id;
                    purchaseOrderToUpdate.date = purchaseOrder.date;
                    purchaseOrderToUpdate.totalAmount = purchaseOrder.totalAmount;
                    purchaseOrderToUpdate.status = purchaseOrder.status;
                    purchaseOrderToUpdate.voucherNo = purchaseOrder.voucherNo;
                    purchaseOrderToUpdate.sup_id = purchaseOrder.supplier;

                    await purchaseOrderRepository.Update(purchaseOrderToUpdate);
                    status = "updated";
                }
            }
            else
            {
                List<DetailOrderDomainModel> detailOrder = new List<DetailOrderDomainModel>();
                detailOrder = purchaseOrder.orderDetails;
                
                Guid obj = Guid.NewGuid();
                string strVchNo = obj.ToString();

                tblPurchaseOrder purchaseOrderToAdd = new tblPurchaseOrder();

                //purchaseOrderToAdd.order_id = purchaseOrder.order_id;

                //purchaseOrderToAdd.date         = purchaseOrder.date;
                //purchaseOrderToAdd.totalAmount  = purchaseOrder.totalAmount;
                //purchaseOrderToAdd.paidAmount   = purchaseOrder.paidAmount;
                //purchaseOrderToAdd.orderDesc    = purchaseOrder.description;
                //purchaseOrderToAdd.status       = "Completed";//purchaseOrder.status;
                //purchaseOrderToAdd.voucherNo    = strVchNo;   //purchaseOrder.voucherNo;
                //purchaseOrderToAdd.supplier       = 1;        //purchaseOrder.supplier;

                //await purchaseOrderRepository.Insert(purchaseOrderToAdd);
                int lastOrderId = 0;

                using (abuhamzapetstoreEntities db = new abuhamzapetstoreEntities())
                {
                    try
                    {
                        
                        var result = db.stpPurchaseOrder(1, purchaseOrder.totalAmount, purchaseOrder.paidAmount,
                            purchaseOrder.description, purchaseOrder.supplier, purchaseOrder.paidAmount, "000025");

                        lastOrderId = (from c in db.tblPurchaseOrders
                                                               orderby c.order_id descending
                                                               select c.order_id).Take(1).SingleOrDefault();

                        tblDetailOrder detailOrderToAdd = new tblDetailOrder();
                        foreach (DetailOrderDomainModel singleDetail in detailOrder)
                        {
                            //detailOrderToAdd.order_id = lastOrderId;
                            //detailOrderToAdd.barcode = singleDetail.barcode;
                            //detailOrderToAdd.quantity = singleDetail.quantity;
                            //detailOrderToAdd.purchasePrice = singleDetail.purchasePrice;
                            //detailOrderToAdd.voucherNo = strVchNo; //singleDetail.barcode;

                            //await detailOrderRepository.Insert(detailOrderToAdd);
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



      //          using (MyDC TheDC = new MyDC())
      //          {
      //              foreach (MyObject TheObject in TheListOfMyObjects)
      //              {
      //                  DBTable TheTable = new DBTable();

      //                  TheTable.Prop1 = TheObject.Prop1;
      //.....
      //TheDC.DBTables.InsertOnSubmit(TheTable);

      //              }
      //              TheDC.SubmitChanges();
      //          }
            }
            return status;
        }

    }
}
