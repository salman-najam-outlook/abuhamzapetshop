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
    [Authorize]
    public class ProductsController : ApiController
    {
        IProductBusiness productBusiness;

        public ProductsController(IProductBusiness _productBusiness)
        {
            productBusiness = _productBusiness;
        }

        // api/users/GetAllProducts
        // This Api call will get all products from the database
        [HttpGet]
        [Route("api/products/GetAllProducts")]
        public async Task<List<ProductToReturnVM>> GetAllProducts()
        {
            List<ProductToReturnVM> listProductVM = new List<ProductToReturnVM>();
            List<tblProduct> listProduct = await productBusiness.GetProducts();
            AutoMapper.Mapper.Map(listProduct, listProductVM);
            return listProductVM;
        }

        // api/products/GetProductById/1
        // This Api call will get single product from the database based on emp_id
        [HttpGet]
        [Route("api/products/GetProductById/{id}")]
        public async Task<ProductToReturnVM> GetProductById(int id)
        {
            ProductToReturnVM productToReturnVM = new ProductToReturnVM();
            ProductDomainModel productDomainModel = await productBusiness.GetProductById(id);
            AutoMapper.Mapper.Map(productDomainModel, productToReturnVM);
            return productToReturnVM;
        }

        // api/products/GetProductById/11111
        // This Api call will get single product from the database based on barcode
        [HttpGet]
        [Route("api/products/GetProductByBarcode/{barcode}")]
        public async Task<ProductToReturnVM> GetProductByBarcode(string barcode)
        {
            ProductToReturnVM productToReturnVM = new ProductToReturnVM();
            ProductDomainModel productDomainModel = await productBusiness.GetProductByBarcode(barcode);
            AutoMapper.Mapper.Map(productDomainModel, productToReturnVM);
            return productToReturnVM;
        }

        // api/products/DeleteProduct/{id}
        // This Api call will delete one product by given emp_id
        [HttpDelete]
        [Route("api/products/DeleteProduct/{id}")]
        public async Task<string> DeleteProduct(int id)
        {
            return await productBusiness.DeleteProduct(id);
        }

        // api/products/AddUpdateProduct/{id}
        // This Api call will Add a new product in case if emp_id is equal to zero else update the product.
        [HttpPost]
        [Route("api/products/AddUpdateProduct")]
        public async Task<string> AddUpdateUser(ProductVM productVM)
        {
            ProductDomainModel productDM = new ProductDomainModel();
            AutoMapper.Mapper.Map(productVM, productDM);
            return await productBusiness.AddUpdateProduct(productDM);
        }
    }
}
