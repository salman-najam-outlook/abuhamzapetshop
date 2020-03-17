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
    public class DetailOrdersController : ApiController
    {
        IDetailOrderBusiness detailOrderBusiness;

        public DetailOrdersController(IDetailOrderBusiness _detailOrderBusiness)
        {
            detailOrderBusiness = _detailOrderBusiness;
        }

        // api/detailOrders/GetAllDetailOrders
        // This Api call will get all detailOrders from the database
        [HttpGet]
        [Route("api/detailOrders/GetAllDetailOrders")]
        public async Task<List<DetailOrderToReturnVM>> GetAllDetailOrders()
        {
            List<DetailOrderToReturnVM> listDetailOrderVM = new List<DetailOrderToReturnVM>();
            List<tblDetailOrder> listDetailOrder = await detailOrderBusiness.GetDetailOrders();
            AutoMapper.Mapper.Map(listDetailOrder, listDetailOrderVM);
            return listDetailOrderVM;
        }

        // api/detailOrders/GetDetailOrderById/1
        // This Api call will get single detailOrder from the database based on detailOrder_id
        [HttpGet]
        [Route("api/detailOrders/GetDetailOrderById/{id}")]
        public async Task<DetailOrderToReturnVM> GetDetailOrderById(int id)
        {
            DetailOrderToReturnVM detailOrderToReturnVM = new DetailOrderToReturnVM();
            DetailOrderDomainModel detailOrderDomainModel = await detailOrderBusiness.GetDetailOrderById(id);
            AutoMapper.Mapper.Map(detailOrderDomainModel, detailOrderToReturnVM);
            return detailOrderToReturnVM;
        }

        // api/detailOrders/DeleteDetailOrder/{id}
        // This Api call will delete one detailOrder by given detailOrder_id
        [HttpDelete]
        [Route("api/detailOrders/DeleteDetailOrder/{id}")]
        public async Task<string> DeleteDetailOrder(int id)
        {
            return await detailOrderBusiness.DeleteDetailOrder(id);
        }

        // api/detailOrders/AddUpdateDetailOrder/{id}
        // This Api call will Add a new detailOrder in case if detailOrder_id is equal to zero else update the detailOrder.
        [HttpPost]
        [Route("api/detailOrders/AddUpdateDetailOrder")]
        public async Task<string> AddUpdateUser(DetailOrderVM detailOrderVM)
        {
            DetailOrderDomainModel detailOrderDM = new DetailOrderDomainModel();
            AutoMapper.Mapper.Map(detailOrderVM, detailOrderDM);
            return await detailOrderBusiness.AddUpdateDetailOrder(detailOrderDM);
        }
    }
}
