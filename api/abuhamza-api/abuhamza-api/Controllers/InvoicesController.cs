using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using abuhamza.business.Interface;
using abuhamza.domain;
using abuhamza.repository;
using abuhamza_api.Models;

namespace abuhamza_api.Controllers
{
    public class InvoicesController : ApiController
    {
        IInvoiceBusiness invoiceBusiness;

        public InvoicesController(IInvoiceBusiness _invoiceBusiness)
        {
            invoiceBusiness = _invoiceBusiness;
        }

        // api/users/GetAllInvoices
        // This Api call will get all invoices from the database
        [HttpGet]
        [Route("api/invoices/GetAllInvoices")]
        public async Task<List<InvoiceToReturnVM>> GetAllInvoices()
        {
            List<InvoiceToReturnVM> listInvoiceVM = new List<InvoiceToReturnVM>();
            List<tblInvoice> listInvoice = await invoiceBusiness.GetInvoices();
            AutoMapper.Mapper.Map(listInvoice, listInvoiceVM);
            return listInvoiceVM;
        }

        // api/invoices/GetInvoiceById/1
        // This Api call will get single invoice from the database based on acc_id
        [HttpGet]
        [Route("api/invoices/GetInvoiceById/{id}")]
        public async Task<InvoiceToReturnVM> GetInvoiceById(int id)
        {
            InvoiceToReturnVM invoiceToReturnVM = new InvoiceToReturnVM();
            InvoiceDomainModel invoiceDomainModel = await invoiceBusiness.GetInvoiceById(id);
            AutoMapper.Mapper.Map(invoiceDomainModel, invoiceToReturnVM);
            return invoiceToReturnVM;
        }

        // api/invoices/DeleteInvoice/{id}
        // This Api call will delete one invoice by given acc_id
        [HttpDelete]
        [Route("api/invoices/DeleteInvoice/{id}")]
        public async Task<string> DeleteInvoice(int id)
        {
            return await invoiceBusiness.DeleteInvoice(id);
        }

        // api/invoices/AddUpdateInvoice/{id}
        // This Api call will Add a new invoice in case if acc_id is equal to zero else update the invoice.
        [HttpPost]
        [Route("api/invoices/AddUpdateInvoice")]
        public async Task<string> AddUpdateInvoice(SaleOrderDomainModel saleOrder)
        {
            SaleOrderDomainModel saleOrderDM = new SaleOrderDomainModel();
            //AutoMapper.Mapper.Map(saleOrder, saleOrderDM);

            //saleOrderDM.date = saleOrder.date;
            //saleOrderDM.discount = saleOrder.discount;
            //saleOrderDM.grandTotal = saleOrder.grandTotal;
            //saleOrderDM.remainingCash = saleOrder.remainingCash;
            //saleOrderDM.subTotal = saleOrder.subTotal;
            //saleOrderDM.tenderAmount = saleOrder.tenderAmount;
            //saleOrderDM.tax = saleOrder.tax;
            //saleOrderDM.totalQty = saleOrder.totalQty;

            //SingleProductDomainModel singleProductDM = new SingleProductDomainModel();

            //List<SingleProduct> singleProductList = new List<SingleProduct>();
            //singleProductList = saleOrder.singleProductList;

            //foreach (SingleProduct singleDetail in singleProductList)
            //{
            //    singleProductDM.barcode = singleDetail.barcode;
            //    singleProductDM.productName = singleDetail.productName;
            //    singleProductDM.purchasePrice = singleDetail.purchasePrice;
            //    singleProductDM.quantity = singleDetail.quantity;
            //    singleProductDM.saleOrder_id = singleDetail.saleOrder_id;
            //    singleProductDM.sellPrice = singleDetail.sellPrice;
            //    singleProductDM.totalAmount = singleDetail.totalAmount;

            //    saleOrderDM.singleProductList.Add(singleProductDM);
            //}

                return await invoiceBusiness.AddUpdateInvoice(saleOrder);
        }
    }
}
