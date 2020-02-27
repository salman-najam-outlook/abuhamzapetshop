using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using abuhamza.domain;
using abuhamza.repository;

namespace abuhamza.business.Interface
{
    public interface IVoucherBusiness
    {
        Task<List<tblvch>> GetVouchers();
        Task<string> DeleteVoucher(int id);
        Task<VoucherDomainModel> GetVoucherById(int id);
        Task<List<VoucherDM>> GetPendingVouchersBySupplierID(int id);
        Task<List<VoucherDM>> GetAllPendingVouchers();// GetAllPendingVouchers
        //Task<string> AddUpdateVoucher(VoucherDomainModel Voucher);
        Task<string> pendingOrderPayment(PaymentVoucherDomainModel Voucher);
    }
}
