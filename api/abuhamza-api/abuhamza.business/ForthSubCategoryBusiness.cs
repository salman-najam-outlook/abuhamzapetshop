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
    public class ForthSubCategoryBusiness : IForthSubCategoryBusiness
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly ForthSubCategoryRepository forthSubCategoryRepository;

        public ForthSubCategoryBusiness(IUnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            forthSubCategoryRepository = new ForthSubCategoryRepository(unitOfWork);
        }

        public async Task<List<tblForthSubCategory>> GetForthSubCategories()
        {
            List<tblForthSubCategory> uList = new List<tblForthSubCategory>();
            uList = await forthSubCategoryRepository.GetAll();

            return uList;
        }

        public async Task<List<tblForthSubCategory>> GetForthSubCategoriesbySubCategoryid(int id)
        {
            List<tblForthSubCategory> uList = new List<tblForthSubCategory>();
            uList = await forthSubCategoryRepository.GetAll(f => f.subCat_id == id);

            return uList;
        }

        public async Task<string> DeleteForthSubCategory(int id)
        {
            string status = "";
            if (id > 0)
            {
                await forthSubCategoryRepository.Delete(f => f.fsubCat_id == id);
                status = "deleted";
            }
            return status;
        }

        public async Task<ForthSubCategoryDomainModel> GetForthSubCategoryById(int id)
        {
            ForthSubCategoryDomainModel forthSubCategory = new ForthSubCategoryDomainModel();
            var model = await forthSubCategoryRepository.SingleOrDefault(f => f.fsubCat_id == id);
            if (model != null)
            {
                forthSubCategory = new ForthSubCategoryDomainModel();
                forthSubCategory.fsubCat_id = model.fsubCat_id;
                forthSubCategory.name = model.name;
                forthSubCategory.subCat_id = model.subCat_id;
            }
            return forthSubCategory;
        }

        public async Task<string> AddUpdateForthSubCategory(ForthSubCategoryDomainModel forthSubCategory)
        {
            string status = "";
            if (forthSubCategory.fsubCat_id > 0)
            {
                tblForthSubCategory forthSubCategoryToUpdate = await forthSubCategoryRepository.SingleOrDefault(f => f.fsubCat_id == forthSubCategory.fsubCat_id);
                if (forthSubCategoryToUpdate != null)
                {
                    forthSubCategoryToUpdate.fsubCat_id = forthSubCategory.fsubCat_id;
                    forthSubCategoryToUpdate.name = forthSubCategory.name;
                    forthSubCategoryToUpdate.subCat_id = forthSubCategory.subCat_id;

                    await forthSubCategoryRepository.Update(forthSubCategoryToUpdate);
                    status = "updated";
                }
            }
            else
            {
                tblForthSubCategory forthSubCategoryToAdd = new tblForthSubCategory();
                forthSubCategoryToAdd.fsubCat_id = forthSubCategory.fsubCat_id;
                forthSubCategoryToAdd.name = forthSubCategory.name;
                forthSubCategoryToAdd.subCat_id = forthSubCategory.subCat_id;

                await forthSubCategoryRepository.Insert(forthSubCategoryToAdd);
                status = "added";
            }
            return status;
        }
    }
}
