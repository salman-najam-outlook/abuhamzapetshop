using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using abuhamza.business.Interface;
using abuhamza.domain;
using abuhamza.repository;
using abuhamza_api.Models;

namespace abuhamza_api.Controllers
{
    public class ForthSubCategoriesController : ApiController
    {
        IForthSubCategoryBusiness forthSubCategoryBusiness;

        public ForthSubCategoriesController(IForthSubCategoryBusiness _forthSubCategoryBusiness)
        {
            forthSubCategoryBusiness = _forthSubCategoryBusiness;
        }

        // api/ForthSubCategories/GetAllForthSubCategories
        // This Api call will get all categories from the database
        [HttpGet]
        [Route("api/ForthSubCategories/GetAllForthSubCategories")]
        public async Task<List<ForthSubCategoryToReturnVM>> GetAllForthSubCategories()
        {
            List<ForthSubCategoryToReturnVM> listForthSubCategoryVM = new List<ForthSubCategoryToReturnVM>();
            List<tblForthSubCategory> listForthSubCategory = await forthSubCategoryBusiness.GetForthSubCategories();
            AutoMapper.Mapper.Map(listForthSubCategory, listForthSubCategoryVM);
            return listForthSubCategoryVM;
        }

        // api/ForthSubCategories/GetForthSubCategoriesbySubCategoryid/1
        // This Api call will get all ForthSubCategories from the database
        [HttpGet]
        [Route("api/ForthSubCategories/GetForthSubCategoriesbySubCategoryid/{id}")]
        public async Task<List<ForthSubCategoryToReturnVM>> GetForthSubCategoriesbySubCategoryid(int id)
        {
            List<ForthSubCategoryToReturnVM> listForthSubCategoryVM = new List<ForthSubCategoryToReturnVM>();
            List<tblForthSubCategory> listForthSubCategory = await forthSubCategoryBusiness.GetForthSubCategoriesbySubCategoryid(id);
            AutoMapper.Mapper.Map(listForthSubCategory, listForthSubCategoryVM);
            return listForthSubCategoryVM;
        }

        // api/ForthSubCategories/GetForthSubCategoryById/1
        // This Api call will get single forthSubCategory from the database based on fsubCat_id
        [HttpGet]
        [Route("api/ForthSubCategories/GetForthSubCategoryById/{id}")]
        public async Task<ForthSubCategoryToReturnVM> GetForthSubCategoryById(int id)
        {
            ForthSubCategoryToReturnVM forthSubCategoryToReturnVM = new ForthSubCategoryToReturnVM();
            ForthSubCategoryDomainModel forthSubCategoryDomainModel = await forthSubCategoryBusiness.GetForthSubCategoryById(id);
            AutoMapper.Mapper.Map(forthSubCategoryDomainModel, forthSubCategoryToReturnVM);
            return forthSubCategoryToReturnVM;
        }

        // api/ForthSubCategories/DeleteForthSubCategory/{id}
        // This Api call will delete one forthSubCategory by given fsubCat_id
        [HttpDelete]
        [Route("api/ForthSubCategories/DeleteForthSubCategory/{id}")]
        public async Task<string> DeleteForthSubCategory(int id)
        {
            return await forthSubCategoryBusiness.DeleteForthSubCategory(id);
        }

        // api/ForthSubCategories/AddUpdateForthSubCategory/{id}
        // This Api call will Add a new forthSubCategory in case if fsubCat_id is equal to zero else update the forthSubCategory.
        [HttpPost]
        [Route("api/ForthSubCategories/AddUpdateForthSubCategory")]
        public async Task<string> AddUpdateUser(ForthSubCategoryVM forthSubCategoryVM)
        {
            ForthSubCategoryDomainModel forthSubCategoryDM = new ForthSubCategoryDomainModel();
            AutoMapper.Mapper.Map(forthSubCategoryVM, forthSubCategoryDM);
            return await forthSubCategoryBusiness.AddUpdateForthSubCategory(forthSubCategoryDM);
        }
    }
}
