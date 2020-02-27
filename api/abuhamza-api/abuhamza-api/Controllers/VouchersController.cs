using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using abuhamza.business;
using abuhamza.business.Interface;
using abuhamza.domain;
using abuhamza.repository;
using abuhamza_api.Models;


namespace abuhamza_api.Controllers
{
    public class VouchersController : ApiController
    {
        IVoucherBusiness voucherBusiness;

        public VouchersController(IVoucherBusiness _voucherBusiness)
        {
            voucherBusiness = _voucherBusiness;
        }

        // api/users/GetAllVouchers
        // This Api call will get all vouchers from the database
        [HttpGet]
        [Route("api/vouchers/GetAllVouchers")]
        public async Task<List<VoucherToReturnVM>> GetAllVouchers()
        {
            List<VoucherToReturnVM> listVoucherVM = new List<VoucherToReturnVM>();
            List<tblvch> listVoucher = await voucherBusiness.GetVouchers();
            AutoMapper.Mapper.Map(listVoucher, listVoucherVM);
            return listVoucherVM;
        }

        // api/vouchers/GetVoucherById/1
        // This Api call will get single voucher from the database based on acc_id
        [HttpGet]
        [Route("api/vouchers/GetVoucherById/{id}")]
        public async Task<VoucherToReturnVM> GetVoucherById(int id)
        {
            VoucherToReturnVM voucherToReturnVM = new VoucherToReturnVM();
            VoucherDomainModel voucherDomainModel = await voucherBusiness.GetVoucherById(id);
            AutoMapper.Mapper.Map(voucherDomainModel, voucherToReturnVM);
            return voucherToReturnVM;
        }

        // api/vouchers/GetVoucherById/1
        // This Api call will get single voucher from the database based on acc_id
        [HttpGet]
        [Route("api/vouchers/GetPendingVouchersBySupplierID/{id}")]
        public async Task<IEnumerable<VoucherDM>> GetPendingVouchersBySupplierID(int id)
        {
            //VoucherToReturnVM voucherToReturnVM = new VoucherToReturnVM();
            IEnumerable<VoucherDM> voucherDomainModel = await voucherBusiness.GetPendingVouchersBySupplierID(id);
           // AutoMapper.Mapper.Map(voucherDomainModel, voucherToReturnVM);
            return voucherDomainModel;
        }

        // api/vouchers/GetAllPendingVouchers
        // This Api call will get all pending vouchers
        [HttpGet]
        [Route("api/vouchers/GetAllPendingVouchers")]
        public async Task<IEnumerable<VoucherDM>> GetAllPendingVouchers()
        {
            IEnumerable<VoucherDM> voucherDomainModel = await voucherBusiness.GetAllPendingVouchers();
            return voucherDomainModel;
        }

        [HttpPost]
        [Route("api/vouchers/pendingOrderPayment/")]
        public async Task<string> pendingOrderPayment(PaymentVoucher paymentVoucher)
        {
            PaymentVoucherDomainModel paymentVoucherDM = new PaymentVoucherDomainModel();
            AutoMapper.Mapper.Map(paymentVoucher, paymentVoucherDM);
            return await voucherBusiness.pendingOrderPayment(paymentVoucherDM);
        }
    }
}
