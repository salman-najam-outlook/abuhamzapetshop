using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using abuhamza.domain;
using abuhamza.repository;

namespace abuhamza.business.Interface
{
    public interface ITransactionBusiness
    {
        Task<List<tblTransaction>> GetTransactions();
        Task<string> DeleteTransaction(int id);
        Task<TransactionDomainModel> GetTransactionById(int id);
        Task<string> AddUpdateTransaction(TransactionDomainModel Transaction);
    }
}
