using abuhamza.business.Interface;
using abuhamza.domain;
using abuhamza.repository;
using abuhamza.repository.Infrastructure.Contract;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.business
{
    public class VoucherBusiness : IVoucherBusiness
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly VoucherRepository voucherRepository;

        public VoucherBusiness(IUnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            voucherRepository = new VoucherRepository(unitOfWork);
        }

        public async Task<List<tblvch>> GetVouchers()
        {
            List<tblvch> uList = new List<tblvch>();
            uList = await voucherRepository.GetAll();

            return uList;
        }

        public async Task<List<VoucherDM>> GetPendingVouchersBySupplierID(int id)
        {
            List<VoucherDM> suList = new List<VoucherDM>();

            List<tblvch> upList = new List<tblvch>();
            upList = await voucherRepository.GetAll(v => v.vch_id == id);
            string status ="";

            DataTable dt = new DataTable();

            using (SqlConnection conn = new SqlConnection(@"data source=DESKTOP-P44VT9L\SQLEXPRESS;initial catalog=abuhamzapetstore;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework"))
            using (SqlCommand cmd = new SqlCommand("stpGetPendingVouchersBySupplierID", conn))
            {

                SqlDataAdapter adapt = new SqlDataAdapter(cmd);
                adapt.SelectCommand.CommandType = CommandType.StoredProcedure;
                adapt.SelectCommand.Parameters.Add(new SqlParameter("@sup_Id", SqlDbType.Int));
                adapt.SelectCommand.Parameters["@sup_Id"].Value = id;

                adapt.Fill(dt);

                suList = (from DataRow dr in dt.Rows
                          select new VoucherDM()
                          {
                              vch_id = Convert.ToInt32(dr["vch_id"]),
                              vchNo = dr["vchNo"].ToString(),
                              date = Convert.ToDateTime(dr["date"]),
                              pendingAmount = Convert.ToDecimal(dr["pendingAmount"]),
                              paidAmount = Convert.ToDecimal(dr["paidAmount"]),
                              totalAmount = Convert.ToDecimal(dr["totalAmount"]),
                              status = dr["status"].ToString(),
                              vchType = dr["vchType"].ToString(),
                              SupplierName = dr["SupplierName"].ToString()
                          }).ToList();
            }            
            return suList;
        }

        public async Task<string> DeleteVoucher(int id)
        {
            string status = "";
            if (id > 0)
            {
                await voucherRepository.Delete(v => v.vch_id == id);
                status = "deleted";
            }
            return status;
        }

        public async Task<VoucherDomainModel> GetVoucherById(int id)
        {
            VoucherDomainModel voucher = new VoucherDomainModel();
            var model = await voucherRepository.SingleOrDefault(v => v.vch_id == id);
            if (model != null)
            {
                voucher = new VoucherDomainModel();
                voucher.status = model.status;

            }
            return voucher;
        }

        public async Task<string> AddUpdateVoucher(VoucherDomainModel voucher)
        {
            string status = "";
            if (voucher.vch_id > 0)
            {
                tblvch voucherToUpdate = await voucherRepository.SingleOrDefault(u => u.vch_id == voucher.vch_id);
                if (voucherToUpdate != null)
                {
                    voucherToUpdate.status = voucher.status;
                    await voucherRepository.Update(voucherToUpdate);
                    status = "updated";
                }
            }
            else
            {
                tblvch voucherToAdd = new tblvch();

                voucherToAdd.status = voucher.status;
              
                await voucherRepository.Insert(voucherToAdd);
                status = "added";
            }
            return status;
        }
    }
}
