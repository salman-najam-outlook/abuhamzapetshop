using abuhamza.domain;
using abuhamza.repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.business.Interface
{
    public interface IEmployeeBusiness
    {
            Task<List<tblEmployee>> GetEmployees();
            Task<string> DeleteEmployee(int id);
            Task<EmployeeDomainModel> GetEmployeeById(int id);
            Task<string> AddUpdateEmployee(EmployeeDomainModel Employee);
    }
}
