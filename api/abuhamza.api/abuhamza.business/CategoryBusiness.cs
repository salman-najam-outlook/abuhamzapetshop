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
    public class CategoryBusiness : ICategoryBusiness
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly CategoryRepository categoryRepository;

        public CategoryBusiness(IUnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            categoryRepository = new CategoryRepository(unitOfWork);
        }

        public async Task<List<tblCategory>> GetCategories()
        {
            List<tblCategory> uList = new List<tblCategory>();
            uList = await categoryRepository.GetAll();

            return uList;
        }

        public async Task<List<tblCategory>> GetAllCategoriesByMainCategoryId(int id)
        {
            List<tblCategory> uList = new List<tblCategory>();
            uList = await categoryRepository.GetAll(c =>c.mainCat_id == id);

            return uList;
        }

        public async Task<string> DeleteCategory(int id)
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
                        count = (from c in db.tblSubCategories
                                 where c.cat_id == id
                                 select 1).Take(1).SingleOrDefault();
                        countProduct = (from p in db.tblProducts
                                        where p.cat_id == id
                                        select 1).Take(1).SingleOrDefault();

                        if (count == 0 && countProduct == 0)
                        {
                            await categoryRepository.Delete(c => c.cat_id == id);
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

        public async Task<CategoryDomainModel> GetCategoryById(int id)
        {
            CategoryDomainModel category = new CategoryDomainModel();
            var model = await categoryRepository.SingleOrDefault(c => c.cat_id == id);
            if (model != null)
            {
                category = new CategoryDomainModel();
                category.cat_id = model.cat_id;
                category.name = model.name;
                category.mainCat_id = model.mainCat_id;
            }
            return category;
        }

        public async Task<string> AddUpdateCategory(CategoryDomainModel category)
        {
            string status = "";
            if (category.cat_id > 0)
            {
                tblCategory categoryToUpdate = await categoryRepository.SingleOrDefault(c => c.cat_id == category.cat_id);
                if (categoryToUpdate != null)
                {
                    categoryToUpdate.cat_id = category.cat_id;
                    categoryToUpdate.name = category.name;
                    categoryToUpdate.mainCat_id = category.mainCat_id;

                    await categoryRepository.Update(categoryToUpdate);
                    status = "updated";
                }
            }
            else
            {
                tblCategory categoryToAdd = new tblCategory();
                categoryToAdd.cat_id = category.cat_id;
                categoryToAdd.name = category.name;
                categoryToAdd.mainCat_id = category.mainCat_id;

                await categoryRepository.Insert(categoryToAdd);
                status = "added";
            }
            return status;
        }
    }
}
