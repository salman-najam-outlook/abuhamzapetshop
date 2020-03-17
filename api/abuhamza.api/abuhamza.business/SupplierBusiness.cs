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
    public class SupplierBusiness : ISupplierBusiness
    {
        private readonly IUnitOfWork unitOfWork;

        private readonly SupplierRepository supplierRepository;

        public SupplierBusiness(IUnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            supplierRepository = new SupplierRepository(unitOfWork);
        }

        public async Task<List<tblSupplier>> GetSuppliers()
        {
            List<tblSupplier> uList = new List<tblSupplier>();
            uList = await supplierRepository.GetAll();

            return uList;
        }

        public async Task<string> DeleteSupplier(int id)
        {
            string status = "";
            if (id > 0)
            {
                await supplierRepository.Delete(s => s.sup_id == id);
                status = "deleted";
            }
            return status;
        }

        public async Task<SupplierDomainModel> GetSupplierById(int id)
        {
            SupplierDomainModel supplier = new SupplierDomainModel();
            var model = await supplierRepository.SingleOrDefault(s => s.sup_id == id);
            if (model != null)
            {
                supplier.sup_id = model.sup_id;
                supplier.name = model.name;
                supplier.contact = model.contact;
                supplier.company = model.company;
                supplier.date = model.date;
            }
            return supplier;
        }

        public async Task<string> AddUpdateSupplier(SupplierDomainModel supplier)
        {
            string status = "";
            int sup_id = 0;
            if (supplier.sup_id > 0)
            {
                tblSupplier supplierToUpdate = await supplierRepository.SingleOrDefault(s => s.sup_id == supplier.sup_id);
                if (supplierToUpdate != null)
                {
                    supplierToUpdate.name = supplier.name;
                    supplierToUpdate.contact = supplier.contact;
                    supplierToUpdate.company = supplier.company;
                    supplierToUpdate.date = supplier.date;
                    await supplierRepository.Update(supplierToUpdate);
                    status = "updated";
                }
            }
            else
            {
                tblSupplier supplierToAdd = new tblSupplier();
                supplierToAdd.name = supplier.name;
                supplierToAdd.contact = supplier.contact;
                supplierToAdd.company = supplier.company;
                supplierToAdd.date = DateTime.Now;
                await supplierRepository.Insert(supplierToAdd);

                using (abuhamzapetstoreEntities db = new abuhamzapetstoreEntities())
                {
                    try
                    {
                        sup_id = (from c in db.tblSuppliers
                                  orderby c.sup_id descending
                                  select c.sup_id).Take(1).SingleOrDefault();

                        var result = db.stpOpenAccountWithMapping(sup_id, 1, 2, supplier.name);
                    }
                    catch (Exception ex)
                    {
                        status = ex.Message;
                    }
                    }


                        status = "added";
            }
            return status;
        }

    }
}
