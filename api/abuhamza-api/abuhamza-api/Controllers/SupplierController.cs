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
    public class SuppliersController : ApiController
    {
        ISupplierBusiness supplierBusiness;

        public SuppliersController(ISupplierBusiness _supplierBusiness)
        {
            supplierBusiness = _supplierBusiness;
        }

        // api/users/GetAllSuppliers
        // This Api call will get all suppliers from the database
        [HttpGet]
        [Route("api/suppliers/GetAllSuppliers")]
        public async Task<List<SupplierToReturnVM>> GetAllSuppliers()
        {
            List<SupplierToReturnVM> listSupplierVM = new List<SupplierToReturnVM>();
            List<tblSupplier> listSupplier = await supplierBusiness.GetSuppliers();
            AutoMapper.Mapper.Map(listSupplier, listSupplierVM);
            return listSupplierVM;
        }

        // api/suppliers/GetSupplierById/1
        // This Api call will get single supplier from the database based on sup_id
        [HttpGet]
        [Route("api/suppliers/GetSupplierById/{id}")]
        public async Task<SupplierToReturnVM> GetSupplierById(int id)
        {
            SupplierToReturnVM supplierToReturnVM = new SupplierToReturnVM();
            SupplierDomainModel supplierDomainModel = await supplierBusiness.GetSupplierById(id);
            AutoMapper.Mapper.Map(supplierDomainModel, supplierToReturnVM);
            return supplierToReturnVM;
        }

        // api/suppliers/DeleteSupplier/{id}
        // This Api call will delete one supplier by given sup_id
        [HttpDelete]
        [Route("api/suppliers/DeleteSupplier/{id}")]
        public async Task<string> DeleteSupplier(int id)
        {
            return await supplierBusiness.DeleteSupplier(id);
        }

        // api/suppliers/AddUpdateSupplier/{id}
        // This Api call will Add a new supplier in case if sup_id is equal to zero else update the supplier.
        [HttpPost]
        [Route("api/suppliers/AddUpdateSupplier")]
        public async Task<string> AddUpdateUser(SupplierVM supplierVM)
        {
            SupplierDomainModel supplierDM = new SupplierDomainModel();
            AutoMapper.Mapper.Map(supplierVM, supplierDM);
            return await supplierBusiness.AddUpdateSupplier(supplierDM);
        }
    }
}
