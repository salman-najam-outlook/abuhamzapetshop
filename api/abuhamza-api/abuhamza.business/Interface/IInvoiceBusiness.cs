using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using abuhamza.domain;
using abuhamza.repository;

namespace abuhamza.business.Interface
{
    public interface IInvoiceBusiness
    {
        Task<List<tblInvoice>> GetInvoices();
        Task<string> DeleteInvoice(int id);
        Task<InvoiceDomainModel> GetInvoiceById(int id);
        Task<string> AddUpdateInvoice(InvoiceDomainModel Invoice);
    }
}
