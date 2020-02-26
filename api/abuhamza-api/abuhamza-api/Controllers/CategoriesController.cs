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
    public class CategoriesController : ApiController
    {
        ICategoryBusiness categoryBusiness;

        public CategoriesController(ICategoryBusiness _categoryBusiness)
        {
            categoryBusiness = _categoryBusiness;
        }

        // api/categories/GetAllCategories
        // This Api call will get all categories from the database
        [HttpGet]
        [Route("api/categories/GetAllCategories")]
        public async Task<List<CategoryToReturnVM>> GetAllCategories()
        {
            List<CategoryToReturnVM> listCategoryVM = new List<CategoryToReturnVM>();
            List<tblCategory> listCategory = await categoryBusiness.GetCategories();
            AutoMapper.Mapper.Map(listCategory, listCategoryVM);
            return listCategoryVM;
        }

        // api/categories/GetAllCategoriesByMainCategoryId
        // This Api call will get all categories from the database
        [HttpGet]
        [Route("api/categories/GetAllCategoriesByMainCategoryId/{id}")]
        public async Task<List<CategoryToReturnVM>> GetAllCategoriesByMainCategoryId(int id)
        {
            List<CategoryToReturnVM> listCategoryVM = new List<CategoryToReturnVM>();
            List<tblCategory> listCategory = await categoryBusiness.GetAllCategoriesByMainCategoryId(id);
            AutoMapper.Mapper.Map(listCategory, listCategoryVM);
            return listCategoryVM;
        }

        // api/categories/GetCategoryById/1
        // This Api call will get single category from the database based on cat_id
        [HttpGet]
        [Route("api/categories/GetCategoryById/{id}")]
        public async Task<CategoryToReturnVM> GetCategoryById(int id)
        {
            CategoryToReturnVM categoryToReturnVM = new CategoryToReturnVM();
            CategoryDomainModel categoryDomainModel = await categoryBusiness.GetCategoryById(id);
            AutoMapper.Mapper.Map(categoryDomainModel, categoryToReturnVM);
            return categoryToReturnVM;
        }

        // api/categories/DeleteCategory/{id}
        // This Api call will delete one category by given cat_id
        [HttpDelete]
        [Route("api/categories/DeleteCategory/{id}")]
        public async Task<string> DeleteCategory(int id)
        {
            return await categoryBusiness.DeleteCategory(id);
        }

        // api/categories/AddUpdateCategory/{id}
        // This Api call will Add a new category in case if cat_id is equal to zero else update the category.
        [HttpPost]
        [Route("api/categories/AddUpdateCategory")]
        public async Task<string> AddUpdateCategory(CategoryVM categoryVM)
        {
            CategoryDomainModel categoryDM = new CategoryDomainModel();
            AutoMapper.Mapper.Map(categoryVM, categoryDM);
            return await categoryBusiness.AddUpdateCategory(categoryDM);
        }


    }
}
