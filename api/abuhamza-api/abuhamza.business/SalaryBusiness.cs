using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using abuhamza.business.Interface;
using abuhamza.domain;
using abuhamza.repository;
using abuhamza.repository.Infrastructure.Contract;

namespace abuhamza.business
{
    public class SalaryBusiness :ISalaryBusiness
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly SalaryRepository salaryRepository;

        public SalaryBusiness(IUnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            salaryRepository = new SalaryRepository(unitOfWork);
        }

        public async Task<List<tblSalary>> GetSalaries()
        {
            List<tblSalary> uList = new List<tblSalary>();
            uList = await salaryRepository.GetAll();

            return uList;
        }

        public async Task<string> DeleteSalary(int id)
        {
            string status = "";
            if (id > 0)
            {
                await salaryRepository.Delete(s => s.sal_id == id);
                status = "deleted";
            }
            return status;
        }

        public async Task<SalaryDomainModel> GetSalaryById(int id)
        {
            SalaryDomainModel salary = new SalaryDomainModel();
            var model = await salaryRepository.SingleOrDefault(s => s.sal_id == id);
            if (model != null)
            {
                salary.sal_id = model.sal_id;
                salary.date = model.date;
                salary.emp_id = model.emp_id;
                salary.amount = model.amount;
            }
            return salary;
        }

        public async Task<string> AddUpdateSalary(SalaryDomainModel salary)
        {
            string status = "";
            if (salary.sal_id > 0)
            {
                tblSalary salaryToUpdate = await salaryRepository.SingleOrDefault(s => s.sal_id == salary.sal_id);
                if (salaryToUpdate != null)
                {
                    salaryToUpdate.date = salary.date;
                    salaryToUpdate.emp_id = salary.emp_id;
                    salaryToUpdate.amount = salary.amount;
                    await salaryRepository.Update(salaryToUpdate);
                    status = "updated";
                }
            }
            else
            {
                tblSalary salaryToAdd = new tblSalary();
                salaryToAdd.date = salary.date;
                salaryToAdd.emp_id = salary.emp_id;
                salaryToAdd.amount = salary.amount;
                await salaryRepository.Insert(salaryToAdd);
                status = "added";
            }
            return status;
        }
    }
}
