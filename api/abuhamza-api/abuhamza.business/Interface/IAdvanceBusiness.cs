using abuhamza.domain;
using abuhamza.repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.business.Interface
{
    public interface IAdvanceBusiness
    {
        Task<List<tblAdvance>> GetAdvances();
        Task<string> DeleteAdvance(int id);
        Task<AdvanceDomainModel> GetAdvanceById(int id);
        Task<AdvanceDomainModel> GetAdvanceByVoucherNo(string voucherno);
        Task<string> AddUpdateAdvance(AdvanceDomainModel Advance);
    }
}
