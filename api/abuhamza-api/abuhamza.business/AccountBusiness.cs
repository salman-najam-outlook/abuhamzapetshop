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
    public class AccountBusiness : IAccountBusiness
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly AccountRepository accountRepository;

        public AccountBusiness(IUnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            accountRepository = new AccountRepository(unitOfWork);
        }

        public async Task<List<tblAccount>> GetAccounts()
        {
            List<tblAccount> uList = new List<tblAccount>();
            uList = await accountRepository.GetAll();

            return uList;
        }

        public async Task<List<tblAccount>> GetAllAccountsByTypeId(int id)
        {
            List<tblAccount> uList = new List<tblAccount>();
            uList = await accountRepository.GetAll(a => a.AccType_id == id);

            return uList;
        }

        public async Task<string> DeleteAccount(int id)
        {
            string status = "";
            if (id > 0)
            {
                await accountRepository.Delete(a => a.acc_id == id);
                status = "deleted";
            }
            return status;
        }

        public async Task<AccountDomainModel> GetAccountById(int id)
        {
            AccountDomainModel account = new AccountDomainModel();
            var model = await accountRepository.SingleOrDefault(a => a.acc_id == id);
            if (model != null)
            {
                account.acc_id = model.acc_id;
                account.name = model.name;
                account.AccType_id = model.AccType_id;
                account.balance = model.balance;
            }
            return account;
        }

        public async Task<string> AddUpdateAccount(AccountDomainModel account)
        {
            string status = "";
            if (account.acc_id > 0)
            {
                tblAccount accountToUpdate = await accountRepository.SingleOrDefault(c => c.acc_id == account.acc_id);
                if (accountToUpdate != null)
                {
                    accountToUpdate.name = account.name;
                    accountToUpdate.AccType_id = account.AccType_id;
                    accountToUpdate.balance = account.balance;
                    await accountRepository.Update(accountToUpdate);
                    status = "updated";
                }
            }
            else
            {
                tblAccount accountToAdd = new tblAccount();
                accountToAdd.name = account.name;
                accountToAdd.AccType_id = account.AccType_id;
                accountToAdd.balance = account.balance;
                await accountRepository.Insert(accountToAdd);
                status = "added";
            }
            return status;
        }

        public async Task<string> CashTransaction(CashTransactionDomainModel cashTransaction)
        {
            string status = "";
            int vrNo = 0;
            string strVchNo = "";

            int condition = 0;
            if (condition > 0)
            {
                List<tblAccount> uList = new List<tblAccount>();
                uList = await accountRepository.GetAll();
            }

            using (abuhamzapetstoreEntities db = new abuhamzapetstoreEntities())
            {
                try
                {
                    vrNo = (from c in db.tblvches
                            orderby c.vch_id descending
                            select c.vch_id).Take(1).SingleOrDefault();

                    strVchNo = "0000" + (vrNo + 1);

                    var result = db.stpCashTransaction(cashTransaction.debitor_Account_Id,cashTransaction.creditor_Account_Id
                        ,cashTransaction.voucherAmount,strVchNo,cashTransaction.description);
                }
                catch (Exception ex)
                {
                    status = ex.Message;
                }
            }
            return status;
        }
    }
}
