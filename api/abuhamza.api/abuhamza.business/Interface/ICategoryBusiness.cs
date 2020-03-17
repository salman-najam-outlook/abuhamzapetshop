using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using abuhamza.domain;
using abuhamza.repository;

namespace abuhamza.business.Interface
{
    public interface ICategoryBusiness
    {
        Task<List<tblCategory>> GetCategories();
        Task<List<tblCategory>> GetAllCategoriesByMainCategoryId(int id);
        Task<string> DeleteCategory(int id);
        Task<CategoryDomainModel> GetCategoryById(int id);
        Task<string> AddUpdateCategory(CategoryDomainModel Category);
    }
}
