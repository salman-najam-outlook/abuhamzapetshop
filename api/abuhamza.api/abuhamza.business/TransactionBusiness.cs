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
    public class TransactionBusiness : ITransactionBusiness
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly TransactionRepository transactionRepository;

        public TransactionBusiness(IUnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            transactionRepository = new TransactionRepository(unitOfWork);
        }

        public async Task<List<tblTransaction>> GetTransactions()
        {
            List<tblTransaction> uList = new List<tblTransaction>();
            uList = await transactionRepository.GetAll();

            return uList;
        }

        public async Task<string> DeleteTransaction(int id)
        {
            string status = "";
            if (id > 0)
            {
                await transactionRepository.Delete(t => t.tra_id == id);
                status = "deleted";
            }
            return status;
        }

        public async Task<TransactionDomainModel> GetTransactionById(int id)
        {
            TransactionDomainModel transaction = new TransactionDomainModel();
            var model = await transactionRepository.SingleOrDefault(t => t.tra_id == id);
            if (model != null)
            {
                transaction.tra_id      = model.tra_id;
                transaction.tra_type    = model.tra_type;
                transaction.voucherNo   = model.voucherNo;
                transaction.acc_id      = model.acc_id;
                transaction.description = model.description;
                transaction.totalAmount = model.totalAmount;
                transaction.user_id     = model.user_id;
                transaction.totalQty    = model.totalQty;
                transaction.barcode     = model.barcode;
            }
            return transaction;
        }

        public async Task<string> AddUpdateTransaction(TransactionDomainModel transaction)
        {
            string status = "";
            if (transaction.tra_id > 0)
            {
                tblTransaction transactionToUpdate = await transactionRepository.SingleOrDefault(t => t.tra_id == transaction.tra_id);
                if (transactionToUpdate != null)
                {
                    transactionToUpdate.tra_type = transaction.tra_type;
                    transactionToUpdate.voucherNo = transaction.voucherNo;
                    transactionToUpdate.acc_id = transaction.acc_id;
                    transactionToUpdate.description = transaction.description;
                    transactionToUpdate.totalAmount = transaction.totalAmount;
                    transactionToUpdate.user_id = transaction.user_id;
                    transactionToUpdate.totalQty = transaction.totalQty;
                    transactionToUpdate.barcode = transaction.barcode;

                    await transactionRepository.Update(transactionToUpdate);
                    status = "updated";
                }
            }
            else
            {
                tblTransaction transactionToAdd = new tblTransaction();
                transactionToAdd.tra_type = transaction.tra_type;
                transactionToAdd.voucherNo = transaction.voucherNo;
                transactionToAdd.acc_id = transaction.acc_id;
                transactionToAdd.description = transaction.description;
                transactionToAdd.totalAmount = transaction.totalAmount;
                transactionToAdd.user_id = transaction.user_id;
                transactionToAdd.totalQty = transaction.totalQty;
                transactionToAdd.barcode = transaction.barcode;
                    
                await transactionRepository.Insert(transactionToAdd);
                status = "added";
            }
            return status;
        }
    }
}
