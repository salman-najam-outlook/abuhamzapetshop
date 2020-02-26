using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using abuhamza.domain;
using abuhamza.repository;

namespace abuhamza.business.Interface
{
    public interface ISalaryBusiness
    {
        Task<List<tblSalary>> GetSalaries();
        Task<string> DeleteSalary(int id);
        Task<SalaryDomainModel> GetSalaryById(int id);
        Task<string> AddUpdateSalary(SalaryDomainModel Salary);
    }
}
