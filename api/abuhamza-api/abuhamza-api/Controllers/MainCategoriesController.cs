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
    public class MainCategoriesController : ApiController
    {
        IMainCategoryBusiness mainCategoryBusiness;

        public MainCategoriesController(IMainCategoryBusiness _mainCategoryBusiness)
        {
            mainCategoryBusiness = _mainCategoryBusiness;
        }

        // api/mainCategories/GetAllMainCategories
        // This Api call will get all mainCategories from the database
        [HttpGet]
        [Route("api/mainCategories/GetAllMainCategories")]
        public async Task<List<MainCategoryToReturnVM>> GetAllMainCategories()
        {
            List<MainCategoryToReturnVM> listMainCategoryVM = new List<MainCategoryToReturnVM>();
            List<tblMainCategory> listMainCategory = await mainCategoryBusiness.GetMainCategories();
            AutoMapper.Mapper.Map(listMainCategory, listMainCategoryVM);
            return listMainCategoryVM;
        }

        // api/mainCategories/GetMainCategoryById/1
        // This Api call will get single mainCategory from the database based on mainCat_id
        [HttpGet]
        [Route("api/mainCategories/GetMainCategoryById/{id}")]
        public async Task<MainCategoryToReturnVM> GetMainCategoryById(int id)
        {
            MainCategoryToReturnVM mainCategoryToReturnVM = new MainCategoryToReturnVM();
            MainCategoryDomainModel mainCategoryDomainModel = await mainCategoryBusiness.GetMainCategoryById(id);
            AutoMapper.Mapper.Map(mainCategoryDomainModel, mainCategoryToReturnVM);
            return mainCategoryToReturnVM;
        }

        // api/mainCategories/DeleteMainCategory/{id}
        // This Api call will delete one mainCategory by given mainCat_id
        [HttpDelete]
        [Route("api/mainCategories/DeleteMainCategory/{id}")]
        public async Task<string> DeleteMainCategory(int id)
        {
            return await mainCategoryBusiness.DeleteMainCategory(id);
        }

        // api/mainCategories/AddUpdateMainCategory/{id}
        // This Api call will Add a new mainCategory in case if mainCat_id is equal to zero else update the mainCategory.
        [HttpPost]
        [Route("api/mainCategories/AddUpdateMainCategory")]
        public async Task<string> AddUpdateMainCategory(MainCategoryVM mainCategoryVM)
        {
            MainCategoryDomainModel mainCategoryDM = new MainCategoryDomainModel();
            AutoMapper.Mapper.Map(mainCategoryVM, mainCategoryDM);
            return await mainCategoryBusiness.AddUpdateMainCategory(mainCategoryDM);
        }
    }
}
