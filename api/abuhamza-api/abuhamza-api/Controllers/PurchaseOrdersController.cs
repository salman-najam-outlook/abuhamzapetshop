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
    //[Authorize]
    public class PurchaseOrdersController : ApiController
    {
        IPurchaseOrderBusiness purchaseOrderBusiness;

        public PurchaseOrdersController(IPurchaseOrderBusiness _purchaseOrderBusiness)
        {
            purchaseOrderBusiness = _purchaseOrderBusiness;
        }

        // api/purchaseOrders/GetAllPurchaseOrders
        // This Api call will get all purchaseOrders from the database
        [HttpGet]
        [Route("api/purchaseOrders/GetAllPurchaseOrders")]
        public async Task<List<PurchaseOrderToReturnVM>> GetAllPurchaseOrders()
        {
            List<PurchaseOrderToReturnVM> listPurchaseOrderVM = new List<PurchaseOrderToReturnVM>();
            List<tblPurchaseOrder> listPurchaseOrder = await purchaseOrderBusiness.GetPurchaseOrders();
            AutoMapper.Mapper.Map(listPurchaseOrder, listPurchaseOrderVM);
            return listPurchaseOrderVM;
        }

        // api/purchaseOrders/GetPurchaseOrderById/1
        // This Api call will get single purchaseOrder from the database based on order_id
        [HttpGet]
        [Route("api/purchaseOrders/GetPurchaseOrderById/{id}")]
        public async Task<PurchaseOrderToReturnVM> GetPurchaseOrderById(int id)
        {
            PurchaseOrderToReturnVM purchaseOrderToReturnVM = new PurchaseOrderToReturnVM();
            PurchaseOrderDomainModel purchaseOrderDomainModel = await purchaseOrderBusiness.GetPurchaseOrderById(id);
            AutoMapper.Mapper.Map(purchaseOrderDomainModel, purchaseOrderToReturnVM);
            return purchaseOrderToReturnVM;
        }

        // api/purchaseOrders/DeletePurchaseOrder/{id}
        // This Api call will delete one purchaseOrder by given order_id
        [HttpDelete]
        [Route("api/purchaseOrders/DeletePurchaseOrder/{id}")]
        public async Task<string> DeletePurchaseOrder(int id)
        {
            return await purchaseOrderBusiness.DeletePurchaseOrder(id);
        }

        // api/purchaseOrders/AddUpdatePurchaseOrder/{id}
        // This Api call will Add a new purchaseOrder in case if order_id is equal to zero else update the purchaseOrder.
        [HttpPost]
        [Route("api/purchaseOrders/AddUpdatePurchaseOrder")]
        public async Task<string> AddUpdateUser(PurchaseOrderVM purchaseOrderVM)
        {
            PurchaseOrderDomainModel purchaseOrderDM = new PurchaseOrderDomainModel();
            AutoMapper.Mapper.Map(purchaseOrderVM, purchaseOrderDM);
            return await purchaseOrderBusiness.AddUpdatePurchaseOrder(purchaseOrderDM);
        }
    }
}
