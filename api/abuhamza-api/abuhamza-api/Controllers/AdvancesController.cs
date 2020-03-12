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
    public class AdvancesController : ApiController
    {
        IAdvanceBusiness advanceBusiness;

        public AdvancesController(IAdvanceBusiness _advanceBusiness)
        {
            advanceBusiness = _advanceBusiness;
        }

        // api/advances/GetAllAdvances
        // This Api call will get all advances from the database
        [HttpGet]
        [Route("api/advances/GetAllAdvances")]
        public async Task<List<AdvanceToReturnVM>> GetAllAdvances()
        {
            List<AdvanceToReturnVM> listAdvanceVM = new List<AdvanceToReturnVM>();
            List<tblAdvance> listAdvance = await advanceBusiness.GetAdvances();
            AutoMapper.Mapper.Map(listAdvance, listAdvanceVM);
            return listAdvanceVM;
        }

        // api/advances/GetAdvanceById/1
        // This Api call will get single advance from the database based on advance_id
        [HttpGet]
        [Route("api/advances/GetAdvanceById/{id}")]
        public async Task<AdvanceToReturnVM> GetAdvanceById(int id)
        {
            AdvanceToReturnVM advanceToReturnVM = new AdvanceToReturnVM();
            AdvanceDomainModel advanceDomainModel = await advanceBusiness.GetAdvanceById(id);
            AutoMapper.Mapper.Map(advanceDomainModel, advanceToReturnVM);
            return advanceToReturnVM;
        }

        // api/advances/GetAdvanceByVoucherNo/string
        // This Api call will get single advance from the database based on advance_id
        [HttpGet]
        [Route("api/advances/GetAdvanceByVoucherNo/{voucherNo}")]
        public async Task<AdvanceToReturnVM> GetAdvanceByVoucherNo(string voucherNo)
        {
            AdvanceToReturnVM advanceToReturnVM = new AdvanceToReturnVM();
            AdvanceDomainModel advanceDomainModel = await advanceBusiness.GetAdvanceByVoucherNo(voucherNo);
            AutoMapper.Mapper.Map(advanceDomainModel, advanceToReturnVM);
            return advanceToReturnVM;
        }

        // api/advances/DeleteAdvance/{id}
        // This Api call will delete one advance by given advance_id
        [HttpDelete]
        [Route("api/advances/DeleteAdvance/{id}")]
        public async Task<string> DeleteAdvance(int id)
        {
            return await advanceBusiness.DeleteAdvance(id);
        }

        // api/advances/AddUpdateAdvance/{id}
        // This Api call will Add a new advance in case if advance_id is equal to zero else update the advance.
        [HttpPost]
        [Route("api/advances/AddUpdateAdvance")]
        public async Task<string> AddUpdateUser(AdvanceVM advanceVM)
        {
            AdvanceDomainModel advanceDM = new AdvanceDomainModel();
            AutoMapper.Mapper.Map(advanceVM, advanceDM);
            return await advanceBusiness.AddUpdateAdvance(advanceDM);
        }
    }
}
