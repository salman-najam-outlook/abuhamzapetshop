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
    public class AccountsController : ApiController
    {
        IAccountBusiness accountBusiness;

        public AccountsController(IAccountBusiness _accountBusiness)
        {
            accountBusiness = _accountBusiness;
        }

        // api/users/GetAllAccounts
        // This Api call will get all accounts from the database
        [HttpGet]
        [Route("api/accounts/GetAllAccounts")]
        public async Task<List<AccountToReturnVM>> GetAllAccounts()
        {
            List<AccountToReturnVM> listAccountVM = new List<AccountToReturnVM>();
            List<tblAccount> listAccount = await accountBusiness.GetAccounts();
            AutoMapper.Mapper.Map(listAccount, listAccountVM);
            return listAccountVM;
        }

        // api/accounts/GetAllAccountsByTypeId/1
        // This Api call will get all accounts from the database
        [HttpGet]
        [Route("api/accounts/GetAllAccountsByTypeId/{id}")]
        public async Task<List<AccountToReturnVM>> GetAllAccountsByTypeId(int id)
        {
            List<AccountToReturnVM> listAccountVM = new List<AccountToReturnVM>();
            List<tblAccount> listAccount = await accountBusiness.GetAllAccountsByTypeId(id);
            AutoMapper.Mapper.Map(listAccount, listAccountVM);
            return listAccountVM;
        }

        // api/accounts/GetAccountById/1
        // This Api call will get single account from the database based on acc_id
        [HttpGet]
        [Route("api/accounts/GetAccountById/{id}")]
        public async Task<AccountToReturnVM> GetAccountById(int id)
        {
            AccountToReturnVM accountToReturnVM = new AccountToReturnVM();
            AccountDomainModel accountDomainModel = await accountBusiness.GetAccountById(id);
            AutoMapper.Mapper.Map(accountDomainModel, accountToReturnVM);
            return accountToReturnVM;
        }

        // api/accounts/DeleteAccount/{id}
        // This Api call will delete one account by given acc_id
        [HttpDelete]
        [Route("api/accounts/DeleteAccount/{id}")]
        public async Task<string> DeleteAccount(int id)
        {
            return await accountBusiness.DeleteAccount(id);
        }

        // api/accounts/AddUpdateAccount/
        // This Api call will Add a new account in case if acc_id is equal to zero else update the account.
        [HttpPost]
        [Route("api/accounts/AddUpdateAccount")]
        public async Task<string> AddUpdateUser(AccountVM accountVM)
        {
            AccountDomainModel accountDM = new AccountDomainModel();
            AutoMapper.Mapper.Map(accountVM, accountDM);
            return await accountBusiness.AddUpdateAccount(accountDM);
        }

        // api/accounts/AddUpdateAccount/
        // This Api call will take care of Cash Transaction
        [HttpPost]
        [Route("api/accounts/CashTransaction")]
        public async Task<string> CashTransaction(CashTransaction cashTransaction)
        {
            CashTransactionDomainModel cashTransactionDM = new CashTransactionDomainModel();
            AutoMapper.Mapper.Map(cashTransaction, cashTransactionDM);
            return await accountBusiness.CashTransaction(cashTransactionDM);
        }
    }
}
