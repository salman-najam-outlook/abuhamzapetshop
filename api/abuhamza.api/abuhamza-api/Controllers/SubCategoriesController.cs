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
    [Authorize]
    public class SubCategoriesController : ApiController
    {
                ISubCategoryBusiness subCategoryBusiness;

        public SubCategoriesController(ISubCategoryBusiness _subCategoryBusiness)
        {
            subCategoryBusiness = _subCategoryBusiness;
        }

        // api/SubCategories/GetAllSubCategories
        // This Api call will get all categories from the database
        [HttpGet]
        [Route("api/SubCategories/GetAllSubCategories")]
        public async Task<List<SubCategoryToReturnVM>> GetAllSubCategories()
        {
            List<SubCategoryToReturnVM> listSubCategoryVM = new List<SubCategoryToReturnVM>();
            List<tblSubCategory> listSubCategory = await subCategoryBusiness.GetSubCategories();
            AutoMapper.Mapper.Map(listSubCategory, listSubCategoryVM);
            return listSubCategoryVM;
        }

        // api/SubCategories/GetSubCategoriesByCategoryId/1
        // This Api call will get all SubCategories from the database
        [HttpGet]
        [Route("api/SubCategories/GetSubCategoriesByCategoryId/{id}")]
        public async Task<List<SubCategoryToReturnVM>> GetSubCategoriesByCategoryId(int id)
        {
            List<SubCategoryToReturnVM> listSubCategoryVM = new List<SubCategoryToReturnVM>();
            List<tblSubCategory> listSubCategory = await subCategoryBusiness.GetSubCategoriesByCategoryId(id);
            AutoMapper.Mapper.Map(listSubCategory, listSubCategoryVM);
            return listSubCategoryVM;
        }

        // api/SubCategories/GetSubCategoryById/1
        // This Api call will get single subCategory from the database based on cat_id
        [HttpGet]
        [Route("api/SubCategories/GetSubCategoryById/{id}")]
        public async Task<SubCategoryToReturnVM> GetSubCategoryById(int id)
        {
            SubCategoryToReturnVM subCategoryToReturnVM = new SubCategoryToReturnVM();
            SubCategoryDomainModel subCategoryDomainModel = await subCategoryBusiness.GetSubCategoryById(id);
            AutoMapper.Mapper.Map(subCategoryDomainModel, subCategoryToReturnVM);
            return subCategoryToReturnVM;
        }

        // api/SubCategories/DeleteSubCategory/{id}
        // This Api call will delete one subCategory by given cat_id
        [HttpDelete]
        [Route("api/SubCategories/DeleteSubCategory/{id}")]
        public async Task<string> DeleteSubCategory(int id)
        {
            return await subCategoryBusiness.DeleteSubCategory(id);
        }

        // api/SubCategories/AddUpdateSubCategory/{id}
        // This Api call will Add a new subCategory in case if cat_id is equal to zero else update the subCategory.
        [HttpPost]
        [Route("api/SubCategories/AddUpdateSubCategory")]
        public async Task<string> AddUpdateUser(SubCategoryVM subCategoryVM)
        {
            SubCategoryDomainModel subCategoryDM = new SubCategoryDomainModel();
            AutoMapper.Mapper.Map(subCategoryVM, subCategoryDM);
            return await subCategoryBusiness.AddUpdateSubCategory(subCategoryDM);
        }
    }
}
