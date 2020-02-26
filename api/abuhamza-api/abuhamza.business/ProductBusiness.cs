using abuhamza.business.Interface;
using abuhamza.domain;
using abuhamza.repository;
using abuhamza.repository.Infrastructure.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.business
{
    public class ProductBusiness : IProductBusiness
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly ProductRepository productRepository;


        public ProductBusiness(IUnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            productRepository = new ProductRepository(unitOfWork);
        }

        public async Task<List<tblProduct>> GetProducts()
        {
            List<tblProduct> uList = new List<tblProduct>();
            uList = await productRepository.GetAll();

            return uList;
        }

        public async Task<string> DeleteProduct(int id)
        {
            string status = "";
            if (id > 0)
            {
                await productRepository.Delete(e => e.pro_id == id);
                status = "deleted";
            }
            return status;
        }

        public async Task<ProductDomainModel> GetProductById(int id)
        {
            ProductDomainModel product = new ProductDomainModel();
            var model = await productRepository.SingleOrDefault(e => e.pro_id == id);
            if (model != null)
            {
                product.pro_id          = model.pro_id;
                product.name            = model.name;
                product.barcode         = model.barcode;
                product.description     = model.description;
                product.purchase_price  = model.purchase_price;
                product.sell_price      = model.sell_price;
                product.fsubCat_id      = model.fsubCat_id;
                product.quantity        = model.quantity;
                product.mainCat_id      = model.mainCat_id;
                product.cat_id          = model.cat_id;
                product.subCat_id       = model.subCat_id;
            }
            return product;
        }

        public async Task<string> AddUpdateProduct(ProductDomainModel product)
        {
            string status = "";
            if (product.pro_id > 0)
            {
                tblProduct productToUpdate = await productRepository.SingleOrDefault(e => e.pro_id == product.pro_id);
                if (productToUpdate != null)
                {
                    productToUpdate.name = product.name;
                    productToUpdate.barcode = product.barcode;
                    productToUpdate.description = product.description;
                    productToUpdate.purchase_price = product.purchase_price;
                    productToUpdate.sell_price = product.sell_price;
                    productToUpdate.fsubCat_id = product.fsubCat_id;
                    productToUpdate.quantity = product.quantity;
                    productToUpdate.mainCat_id = product.mainCat_id;
                    productToUpdate.cat_id = product.cat_id;
                    productToUpdate.subCat_id = product.subCat_id;

                    await productRepository.Update(productToUpdate);
                    status = "updated";
                }
            }
            else
            {
                tblProduct productToAdd = new tblProduct();
                productToAdd.name = product.name;
                productToAdd.barcode = product.barcode;
                productToAdd.description = product.description;
                productToAdd.purchase_price = product.purchase_price;
                productToAdd.sell_price = product.sell_price;
                productToAdd.fsubCat_id = product.fsubCat_id;
                productToAdd.quantity = product.quantity;
                productToAdd.mainCat_id = product.mainCat_id;
                productToAdd.cat_id = product.cat_id;
                productToAdd.subCat_id = product.subCat_id;

                await productRepository.Insert(productToAdd);
                status = "added";
            }
            return status;
        }

    }
}