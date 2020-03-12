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
    //[Authorize]
    public class TransactionsController : ApiController
    {
        ITransactionBusiness transactionBusiness;

        public TransactionsController(ITransactionBusiness _transactionBusiness)
        {
            transactionBusiness = _transactionBusiness;
        }

        // api/users/GetAllTransactions
        // This Api call will get all transactions from the database
        [HttpGet]
        [Route("api/transactions/GetAllTransactions")]
        public async Task<List<TransactionToReturnVM>> GetAllTransactions()
        {
            List<TransactionToReturnVM> listTransactionVM = new List<TransactionToReturnVM>();
            List<tblTransaction> listTransaction = await transactionBusiness.GetTransactions();
            AutoMapper.Mapper.Map(listTransaction, listTransactionVM);
            return listTransactionVM;
        }

        // api/transactions/GetTransactionById/1
        // This Api call will get single transaction from the database based on tra_id
        [HttpGet]
        [Route("api/transactions/GetTransactionById/{id}")]
        public async Task<TransactionToReturnVM> GetTransactionById(int id)
        {
            TransactionToReturnVM transactionToReturnVM = new TransactionToReturnVM();
            TransactionDomainModel transactionDomainModel = await transactionBusiness.GetTransactionById(id);
            AutoMapper.Mapper.Map(transactionDomainModel, transactionToReturnVM);
            return transactionToReturnVM;
        }

        // api/transactions/DeleteTransaction/{id}
        // This Api call will delete one transaction by given tra_id
        [HttpDelete]
        [Route("api/transactions/DeleteTransaction/{id}")]
        public async Task<string> DeleteTransaction(int id)
        {
            return await transactionBusiness.DeleteTransaction(id);
        }

        // api/transactions/AddUpdateTransaction/{id}
        // This Api call will Add a new transaction in case if tra_id is equal to zero else update the transaction.
        [HttpPost]
        [Route("api/transactions/AddUpdateTransaction")]
        public async Task<string> AddUpdateUser(TransactionVM transactionVM)
        {
            TransactionDomainModel transactionDM = new TransactionDomainModel();
            AutoMapper.Mapper.Map(transactionVM, transactionDM);
            return await transactionBusiness.AddUpdateTransaction(transactionDM);
        }
    }
}
