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
    public class EmployeeBusiness : IEmployeeBusiness
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly EmployeeRepository employeeRepository;
   

    public EmployeeBusiness(IUnitOfWork _unitOfWork)
    {
        unitOfWork = _unitOfWork;
        employeeRepository = new EmployeeRepository(unitOfWork);
    }

    public async Task<List<tblEmployee>> GetEmployees()
    {
        List<tblEmployee> uList = new List<tblEmployee>();
        uList = await employeeRepository.GetAll();

        return uList;
    }

    public async Task<string> DeleteEmployee(int id)
    {
        string status = "";
        if (id > 0)
        {
            await employeeRepository.Delete(e => e.emp_id == id);
            status = "deleted";
        }
        return status;
    }

    public async Task<EmployeeDomainModel> GetEmployeeById(int id)
    {
        EmployeeDomainModel employee = new EmployeeDomainModel();
        var model = await employeeRepository.SingleOrDefault(e => e.emp_id == id);
        if (model != null)
        {
            employee.emp_id = model.emp_id;
            employee.name = model.name;
            employee.contact = model.contact;
            employee.address = model.address;
            employee.NIC = model.NIC;
            employee.salary = model.salary;
            employee.date = model.date;
            }
        return employee;
    }

    public async Task<string> AddUpdateEmployee(EmployeeDomainModel employee)
    {
        string status = "";
        if (employee.emp_id > 0)
        {
            tblEmployee employeeToUpdate = await employeeRepository.SingleOrDefault(e => e.emp_id == employee.emp_id);
            if (employeeToUpdate != null)
            {
                employeeToUpdate.name = employee.name;
                employeeToUpdate.contact = employee.contact;
                employeeToUpdate.address = employee.address;
                employeeToUpdate.NIC = employee.NIC;
                employeeToUpdate.salary = employee.salary;
                employeeToUpdate.date = employee.date;
                await employeeRepository.Update(employeeToUpdate);
                status = "updated";
            }
        }
        else
        {
            tblEmployee employeeToAdd = new tblEmployee();
            employeeToAdd.name = employee.name;
            employeeToAdd.contact = employee.contact;
            employeeToAdd.address = employee.address;
            employeeToAdd.NIC = employee.NIC;
            employeeToAdd.salary = employee.salary;
            employeeToAdd.date = employee.date;
            await employeeRepository.Insert(employeeToAdd);
            status = "added";
        }
        return status;
    }

}

 }