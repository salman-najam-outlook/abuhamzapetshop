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

        public async Task<string> AddUpdateInvoice(InvoiceDomainModel invoice)
        {
            string status = "";
            if (invoice.invoice_id > 0)
            {
                tblInvoice invoiceToUpdate = await invoiceRepository.SingleOrDefault(i => i.invoice_id == invoice.invoice_id);
                if (invoiceToUpdate != null)
                {
                    invoiceToUpdate.invoice_id = invoice.invoice_id;
                    invoiceToUpdate.date = invoice.date;
                    invoiceToUpdate.totalQty = invoice.totalQty;
                    invoiceToUpdate.totalAmount = invoice.totalAmount;
                    invoiceToUpdate.AmountTendered = invoice.AmountTendered;
                    invoiceToUpdate.change = invoice.change;
                    invoiceToUpdate.user_id = invoice.user_id;
                    invoiceToUpdate.tra_id = invoice.tra_id;

                    await invoiceRepository.Update(invoiceToUpdate);
                    status = "updated";
                }
            }
            else
            {
                tblInvoice invoiceToAdd = new tblInvoice();
                invoiceToAdd.invoice_id = invoice.invoice_id;
                invoiceToAdd.date = invoice.date;
                invoiceToAdd.totalQty = invoice.totalQty;
                invoiceToAdd.totalAmount = invoice.totalAmount;
                invoiceToAdd.AmountTendered = invoice.AmountTendered;
                invoiceToAdd.change = invoice.change;
                invoiceToAdd.user_id = invoice.user_id;
                invoiceToAdd.tra_id = invoice.tra_id;

                await invoiceRepository.Insert(invoiceToAdd);
                status = "added";
            }
            return status;
        }
    }
}
