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
    [Authorize]
    public class EmployeesController : ApiController
    {
        IEmployeeBusiness employeeBusiness;

        public EmployeesController(IEmployeeBusiness _employeeBusiness)
        {
            employeeBusiness = _employeeBusiness;
        }

        // api/users/GetAllEmployees
        // This Api call will get all employees from the database
        [HttpGet]
        [Route("api/employees/GetAllEmployees")]
        public async Task<List<EmployeeToReturnVM>> GetAllEmployees()
        {
            List<EmployeeToReturnVM> listEmployeeVM = new List<EmployeeToReturnVM>();
            List<tblEmployee> listEmployee = await employeeBusiness.GetEmployees();
            AutoMapper.Mapper.Map(listEmployee, listEmployeeVM);
            return listEmployeeVM;
        }

        // api/employees/GetEmployeeById/1
        // This Api call will get single employee from the database based on emp_id
        [HttpGet]
        [Route("api/employees/GetEmployeeById/{id}")]
        public async Task<EmployeeToReturnVM> GetEmployeeById(int id)
        {
            EmployeeToReturnVM employeeToReturnVM = new EmployeeToReturnVM();
            EmployeeDomainModel employeeDomainModel = await employeeBusiness.GetEmployeeById(id);
            AutoMapper.Mapper.Map(employeeDomainModel, employeeToReturnVM);
            return employeeToReturnVM;
        }

        // api/employees/DeleteEmployee/{id}
        // This Api call will delete one employee by given emp_id
        [HttpDelete]
        [Route("api/employees/DeleteEmployee/{id}")]
        public async Task<string> DeleteEmployee(int id)
        {
            return await employeeBusiness.DeleteEmployee(id);
        }

        // api/employees/AddUpdateEmployee/{id}
        // This Api call will Add a new employee in case if emp_id is equal to zero else update the employee.
        [HttpPost]
        [Route("api/employees/AddUpdateEmployee")]
        public async Task<string> AddUpdateUser(EmployeeVM employeeVM)
        {
            EmployeeDomainModel employeeDM = new EmployeeDomainModel();
            AutoMapper.Mapper.Map(employeeVM, employeeDM);
            return await employeeBusiness.AddUpdateEmployee(employeeDM);
        }
    }
}
