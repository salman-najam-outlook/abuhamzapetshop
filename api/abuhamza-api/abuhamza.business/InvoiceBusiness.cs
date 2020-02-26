using abuhamza.business.Interface;
using abuhamza.domain;
using abuhamza.repository;
using abuhamza.repository.Infrastructure.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.business
{
    public class InvoiceBusiness : IInvoiceBusiness
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly InvoiceRepository invoiceRepository;

        public InvoiceBusiness(IUnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            invoiceRepository = new InvoiceRepository(unitOfWork);
        }

        public async Task<List<tblInvoice>> GetInvoices()
        {
            List<tblInvoice> uList = new List<tblInvoice>();
            uList = await invoiceRepository.GetAll();

            return uList;
        }

        public async Task<string> DeleteInvoice(int id)
        {
            string status = "";
            if (id > 0)
            {
                await invoiceRepository.Delete(i => i.invoice_id == id);
                status = "deleted";
            }
            return status;
        }

        public async Task<InvoiceDomainModel> GetInvoiceById(int id)
        {
            InvoiceDomainModel invoice = new InvoiceDomainModel();
            var model = await invoiceRepository.SingleOrDefault(i => i.invoice_id == id);
            if (model != null)
            {
                invoice.invoice_id      = model.invoice_id;
                invoice.date            = model.date;
                invoice.totalQty        = model.totalQty;
                invoice.totalAmount     = model.totalAmount;
                invoice.AmountTendered  = model.AmountTendered;
                invoice.change          = model.change;
                invoice.user_id         = model.user_id;
                invoice.tra_id          = model.tra_id;
            }
            return invoice;
        }

        public async Task<string> AddUpdateInvoice(SaleOrderDomainModel saleOrder)
        {
            int condition = 0;
            if (condition > 0)
            {
                List<tblInvoice> uList = new List<tblInvoice>();
                uList = await invoiceRepository.GetAll();
            }
            
            string status = "";
            int vrNo = 0;
            int totalQty = 0;
            string strVchNo = "";
            
            List<SingleProductDomainModel> singleProductList = new List<SingleProductDomainModel>();
            singleProductList = saleOrder.singleProductList;

            foreach (SingleProductDomainModel singleDetail in singleProductList)
            {
                totalQty = Convert.ToInt32(singleDetail.quantity) + totalQty;
            }

            int lastSaleOrderId = 0;

            using (abuhamzapetstoreEntities db = new abuhamzapetstoreEntities())
            {
                try
                {
                    vrNo = (from c in db.tblvches
                                       orderby c.vch_id descending
                                       select c.vch_id).Take(1).SingleOrDefault();

                    strVchNo = "0000" + (vrNo + 1);

                    var result = db.stpSaleOrder(1, totalQty, saleOrder.subTotal,
                        saleOrder.grandTotal, saleOrder.discount, saleOrder.tenderAmount, saleOrder.remainingCash,
                        "Customer Name",1,saleOrder.grandTotal,strVchNo);

                    lastSaleOrderId = (from c in db.tblInvoices
                                   orderby c.invoice_id descending
                                   select c.invoice_id).Take(1).SingleOrDefault();
                    
                    foreach (SingleProductDomainModel singleDetail in singleProductList)
                    {
                        result = db.stpSaleDetail(lastSaleOrderId, singleDetail.quantity, singleDetail.barcode,
                            singleDetail.sellPrice, strVchNo);
                    }

                }
                catch (Exception ex)
                {
                    status = ex.Message;
                }
            }
            status = "added";
            
            return status;
        }
    }
}
