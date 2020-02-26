using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using abuhamza.domain;
using abuhamza.repository;

namespace abuhamza.business.Interface
{
    public interface IForthSubCategoryBusiness
    {
        Task<List<tblForthSubCategory>> GetForthSubCategories();
        Task<List<tblForthSubCategory>> GetForthSubCategoriesbySubCategoryid(int id);
        Task<string> DeleteForthSubCategory(int id);
        Task<ForthSubCategoryDomainModel> GetForthSubCategoryById(int id);
        Task<string> AddUpdateForthSubCategory(ForthSubCategoryDomainModel ForthSubCategory);
    }
}
