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
    public class MainCategoryBusiness : IMainCategoryBusiness
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly MainCategoryRepository mainCategoryRepository;

        public MainCategoryBusiness(IUnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            mainCategoryRepository = new MainCategoryRepository(unitOfWork);
        }

        public async Task<List<tblMainCategory>> GetMainCategories()
        {
            List<tblMainCategory> uList = new List<tblMainCategory>();
            uList = await mainCategoryRepository.GetAll();

            return uList;
        }

        public async Task<string> DeleteMainCategory(int id)
        {
            string status = "";
            int count = 0;
            
            if (id > 0)
            {
                using (abuhamzapetstoreEntities db = new abuhamzapetstoreEntities())
                {
                    try
                    {
                        //var result =db.CheckChildCategory(id, 0, 0);
                        count = (from c in db.tblCategories
                                 where c.mainCat_id == id
                                 select 1).Take(1).SingleOrDefault();

                        if (count == 0)
                        {
                            await mainCategoryRepository.Delete(m => m.mainCat_id == id);
                            status = "Deleted";
                        }
                        else
                        {
                            status = "NotDelete";
                        }

                    }
                    catch (Exception ex)
                    {
                        status = ex.Message;
                    }
                }
                
            }
            return status;
        }

        public async Task<MainCategoryDomainModel> GetMainCategoryById(int id)
        {
            MainCategoryDomainModel mainCategory = new MainCategoryDomainModel();
            var model = await mainCategoryRepository.SingleOrDefault(m => m.mainCat_id == id);
            if (model != null)
            {
                mainCategory = new MainCategoryDomainModel();
                mainCategory.mainCat_id = model.mainCat_id;
                mainCategory.name       = model.name;
                mainCategory.type       = model.type;
                mainCategory.unit       = model.unit;

            }
            return mainCategory;
        }

        public async Task<string> AddUpdateMainCategory(MainCategoryDomainModel mainCategory)
        {
            string status = "";
            if (mainCategory.mainCat_id > 0)
            {
                tblMainCategory mainCategoryToUpdate = await mainCategoryRepository.SingleOrDefault(m => m.mainCat_id == mainCategory.mainCat_id);
                if (mainCategoryToUpdate != null)
                {
                    mainCategoryToUpdate.mainCat_id = mainCategory.mainCat_id;
                    mainCategoryToUpdate.name = mainCategory.name;
                    mainCategoryToUpdate.type = mainCategory.type;
                    mainCategoryToUpdate.unit = mainCategory.unit; 
                 
                    await mainCategoryRepository.Update(mainCategoryToUpdate);
                    status = "updated";
                }
            }
            else
            {
                tblMainCategory mainCategoryToAdd = new tblMainCategory();
                mainCategoryToAdd.mainCat_id = mainCategory.mainCat_id;
                mainCategoryToAdd.name = mainCategory.name;
                mainCategoryToAdd.type = mainCategory.type;
                mainCategoryToAdd.unit = mainCategory.unit;
                
                await mainCategoryRepository.Insert(mainCategoryToAdd);
                status = "added";
            }
            return status;
        }
    }
}
