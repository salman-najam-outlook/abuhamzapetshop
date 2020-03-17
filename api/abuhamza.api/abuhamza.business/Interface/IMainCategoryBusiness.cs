using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using abuhamza.domain;
using abuhamza.repository;

namespace abuhamza.business.Interface
{
    public interface IMainCategoryBusiness
    {
        Task<List<tblMainCategory>> GetMainCategories();
        Task<string> DeleteMainCategory(int id);
        Task<MainCategoryDomainModel> GetMainCategoryById(int id);
        Task<string> AddUpdateMainCategory(MainCategoryDomainModel MainCategory);
    }
}
