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
    public class DetailOrderBusiness : IDetailOrderBusiness
    {
        private readonly IUnitOfWork unitOfWork;

        private readonly DetailOrderRepository detailOrderRepository;

        public DetailOrderBusiness(IUnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            detailOrderRepository = new DetailOrderRepository(unitOfWork);
        }

        public async Task<List<tblDetailOrder>> GetDetailOrders()
        {
            List<tblDetailOrder> uList = new List<tblDetailOrder>();
            uList = await detailOrderRepository.GetAll();

            return uList;
        }

        public async Task<string> DeleteDetailOrder(int id)
        {
            string status = "";
            if (id > 0)
            {
                await detailOrderRepository.Delete(d => d.detailOrder_id == id);
                status = "deleted";
            }
            return status;
        }

        public async Task<DetailOrderDomainModel> GetDetailOrderById(int id)
        {
            DetailOrderDomainModel detailOrder = new DetailOrderDomainModel();
            var model = await detailOrderRepository.SingleOrDefault(d => d.detailOrder_id == id);
            if (model != null)
            {
                detailOrder.detailOrder_id  = model.detailOrder_id;
                detailOrder.barcode         = model.barcode;
                detailOrder.quantity        = model.quantity;
                detailOrder.purchasePrice   = model.purchasePrice;
                detailOrder.order_id        = model.order_id;
                detailOrder.pro_id          = model.pro_id;
            }
            return detailOrder;
        }

        public async Task<string> AddUpdateDetailOrder(DetailOrderDomainModel detailOrder)
        {
            string status = "";
            if (detailOrder.detailOrder_id > 0)
            {
                tblDetailOrder detailOrderToUpdate = await detailOrderRepository.SingleOrDefault(s => s.order_id == detailOrder.order_id);
                if (detailOrderToUpdate != null)
                {
                    detailOrderToUpdate.detailOrder_id = detailOrder.detailOrder_id;
                    detailOrderToUpdate.barcode = detailOrder.barcode;
                    detailOrderToUpdate.quantity = detailOrder.quantity;
                    detailOrderToUpdate.purchasePrice = detailOrder.purchasePrice;
                    detailOrderToUpdate.order_id = detailOrder.order_id;
                    detailOrderToUpdate.pro_id = detailOrder.pro_id;     


                    await detailOrderRepository.Update(detailOrderToUpdate);
                    status = "updated";
                }
            }
            else
            {
                tblDetailOrder detailOrderToAdd = new tblDetailOrder();
                detailOrderToAdd.detailOrder_id = detailOrder.detailOrder_id;
                detailOrderToAdd.barcode = detailOrder.barcode;
                detailOrderToAdd.quantity = detailOrder.quantity;
                detailOrderToAdd.purchasePrice = detailOrder.purchasePrice;
                detailOrderToAdd.order_id = detailOrder.order_id;
                detailOrderToAdd.pro_id = detailOrder.pro_id;      

                await detailOrderRepository.Insert(detailOrderToAdd);
                status = "added";
            }
            return status;
        }

    }
}
