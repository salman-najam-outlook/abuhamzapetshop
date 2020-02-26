using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using abuhamza.domain;
using abuhamza.repository;

namespace abuhamza.business.Interface
{
    public interface ISubCategoryBusiness
    {
        Task<List<tblSubCategory>> GetSubCategories();
        Task<List<tblSubCategory>> GetSubCategoriesByCategoryId(int id);
        Task<string> DeleteSubCategory(int id);
        Task<SubCategoryDomainModel> GetSubCategoryById(int id);
        Task<string> AddUpdateSubCategory(SubCategoryDomainModel SubCategory);
    }
}
