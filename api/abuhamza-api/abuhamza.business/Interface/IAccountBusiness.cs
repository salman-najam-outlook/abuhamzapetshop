﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using abuhamza.domain;
using abuhamza.repository;

namespace abuhamza.business.Interface
{
    public interface IAccountBusiness
    {
        Task<List<tblAccount>> GetAccounts();
        Task<string> DeleteAccount(int id);
        Task<AccountDomainModel> GetAccountById(int id);
        Task<string> AddUpdateAccount(AccountDomainModel Account);
    }
}
