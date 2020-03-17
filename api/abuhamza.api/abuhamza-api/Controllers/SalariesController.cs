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
    public class SalariesController : ApiController
    {
        ISalaryBusiness salaryBusiness;

        public SalariesController(ISalaryBusiness _salaryBusiness)
        {
            salaryBusiness = _salaryBusiness;
        }

        // api/users/GetAllCategories
        // This Api call will get all salaries from the database
        [HttpGet]
        [Route("api/salaries/GetAllSalaries")]
        public async Task<List<SalaryToReturnVM>> GetAllSalaries()
        {
            List<SalaryToReturnVM> listSalaryVM = new List<SalaryToReturnVM>();
            List<tblSalary> listSalary = await salaryBusiness.GetSalaries();
            AutoMapper.Mapper.Map(listSalary, listSalaryVM);
            return listSalaryVM;
        }

        // api/salaries/GetSalaryById/1
        // This Api call will get single salary from the database based on sal_id
        [HttpGet]
        [Route("api/salaries/GetSalaryById/{id}")]
        public async Task<SalaryToReturnVM> GetSalaryById(int id)
        {
            SalaryToReturnVM salaryToReturnVM = new SalaryToReturnVM();
            SalaryDomainModel salaryDomainModel = await salaryBusiness.GetSalaryById(id);
            AutoMapper.Mapper.Map(salaryDomainModel, salaryToReturnVM);
            return salaryToReturnVM;
        }

        // api/salaries/DeleteSalary/{id}
        // This Api call will delete one salary by given sal_id
        [HttpDelete]
        [Route("api/salaries/DeleteSalary/{id}")]
        public async Task<string> DeleteSalary(int id)
        {
            return await salaryBusiness.DeleteSalary(id);
        }

        // api/salaries/AddUpdateSalary/{id}
        // This Api call will Add a new salary in case if sal_id is equal to zero else update the salary.
        [HttpPost]
        [Route("api/salaries/AddUpdateSalary")]
        public async Task<string> AddUpdateUser(SalaryVM salaryVM)
        {
            SalaryDomainModel salaryDM = new SalaryDomainModel();
            AutoMapper.Mapper.Map(salaryVM, salaryDM);
            return await salaryBusiness.AddUpdateSalary(salaryDM);
        }
    }
}
