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
    public class SubCategoryBusiness : ISubCategoryBusiness
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly SubCategoryRepository subCategoryRepository;

        public SubCategoryBusiness(IUnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            subCategoryRepository = new SubCategoryRepository(unitOfWork);
        }

        public async Task<List<tblSubCategory>> GetSubCategories()
        {
            List<tblSubCategory> uList = new List<tblSubCategory>();
            uList = await subCategoryRepository.GetAll();

            return uList;
        }

        public async Task<List<tblSubCategory>> GetSubCategoriesByCategoryId(int id)
        {
            List<tblSubCategory> uList = new List<tblSubCategory>();
            uList = await subCategoryRepository.GetAll(c => c.cat_id == id);

            return uList;
        }

        public async Task<string> DeleteSubCategory(int id)
        {
            string status = "";
            int count = 0;
            int countProduct = 0;
            if (id > 0)
            {
                using (abuhamzapetstoreEntities db = new abuhamzapetstoreEntities())
                {
                    try
                    {
                        count = (from c in db.tblForthSubCategories
                                 where c.subCat_id == id
                                 select 1).Take(1).SingleOrDefault();

                        countProduct = (from p in db.tblProducts
                                 where p.subCat_id == id
                                 select 1).Take(1).SingleOrDefault();

                        if (count == 0 && countProduct == 0)
                        {
                            await subCategoryRepository.Delete(s => s.subCat_id == id);
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

        public async Task<SubCategoryDomainModel> GetSubCategoryById(int id)
        {
            SubCategoryDomainModel subCategory = new SubCategoryDomainModel();
            var model = await subCategoryRepository.SingleOrDefault(s => s.subCat_id == id);
            if (model != null)
            {
                subCategory = new SubCategoryDomainModel();
                subCategory.subCat_id = model.subCat_id;
                subCategory.name = model.name;
                subCategory.cat_id = model.cat_id;
            }
            return subCategory;
        }

        public async Task<string> AddUpdateSubCategory(SubCategoryDomainModel subCategory)
        {
            string status = "";
            if (subCategory.subCat_id > 0)
            {
                tblSubCategory subCategoryToUpdate = await subCategoryRepository.SingleOrDefault(s => s.subCat_id == subCategory.subCat_id);
                if (subCategoryToUpdate != null)
                {
                    subCategoryToUpdate.subCat_id = subCategory.subCat_id;
                    subCategoryToUpdate.name = subCategory.name;
                    subCategoryToUpdate.cat_id = subCategory.cat_id;

                    await subCategoryRepository.Update(subCategoryToUpdate);
                    status = "updated";
                }
            }
            else
            {
                tblSubCategory subCategoryToAdd = new tblSubCategory();
                subCategoryToAdd.subCat_id = subCategory.subCat_id;
                subCategoryToAdd.name = subCategory.name;
                subCategoryToAdd.cat_id = subCategory.cat_id;

                await subCategoryRepository.Insert(subCategoryToAdd);
                status = "added";
            }
            return status;
        }
    }
}
