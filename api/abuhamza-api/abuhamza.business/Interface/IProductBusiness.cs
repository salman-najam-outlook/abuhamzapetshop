using abuhamza.domain;
using abuhamza.repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.business.Interface
{
    public interface IProductBusiness
    {
        Task<List<tblProduct>> GetProducts();
        Task<string> DeleteProduct(int id);
        Task<ProductDomainModel> GetProductById(int id);
        Task<string> AddUpdateProduct(ProductDomainModel Product);
    }
}
