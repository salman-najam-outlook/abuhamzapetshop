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
    public class AdvanceBusiness : IAdvanceBusiness
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly AdvanceRepository advanceRepository;

        public AdvanceBusiness(IUnitOfWork _unitOfWork)
        {
            unitOfWork = _unitOfWork;
            advanceRepository = new AdvanceRepository(unitOfWork);
        }

        public async Task<List<tblAdvance>> GetAdvances()
        {
            List<tblAdvance> uList = new List<tblAdvance>();
            uList = await advanceRepository.GetAll();

            return uList;
        }

        public async Task<string> DeleteAdvance(int id)
        {
            string status = "";
            if (id > 0)
            {
                await advanceRepository.Delete(a => a.advance_id == id);
                status = "deleted";
            }
            return status;
        }

        public async Task<AdvanceDomainModel> GetAdvanceById(int id)
        {
            AdvanceDomainModel advance = new AdvanceDomainModel();
            var model = await advanceRepository.SingleOrDefault(a => a.advance_id == id);
            if (model != null)
            {
                advance.amount      = model.amount;
                advance.barcode     = model.barcode;
                advance.cus_id      = model.cus_id;
                advance.cus_No      = model.cus_No;
                advance.description = model.description;

            }
            return advance;
        }

        public async Task<AdvanceDomainModel> GetAdvanceByVoucherNo(string voucherno)
        {
            AdvanceDomainModel advance = new AdvanceDomainModel();
            var model = await advanceRepository.SingleOrDefault(a => a.voucherNo == voucherno);
            if (model != null)
            {
                advance.amount = model.amount;
                advance.barcode = model.barcode;
                advance.cus_id = model.cus_id;
                advance.cus_No = model.cus_No;
                advance.description = model.description;

            }
            return advance;
        }

        public async Task<string> AddUpdateAdvance(AdvanceDomainModel advance)
        {
            string status = "";
            int condition = 0;
            if (condition > 0)
            {
                List<tblAdvance> uList = new List<tblAdvance>();
                uList = await advanceRepository.GetAll();
            }

            int vrNo = 0;
            string strVchNo = "";

            using (abuhamzapetstoreEntities db = new abuhamzapetstoreEntities())
            {
                try
                {
                    vrNo = (from c in db.tblvches
                            orderby c.vch_id descending
                            select c.vch_id).Take(1).SingleOrDefault();

                    strVchNo = "0000" + (vrNo + 1);

                    var result = db.stpAdvance(advance.amount,advance.barcode,advance.description,advance.cus_No,strVchNo,DateTime.Now,advance.cus_Name);
        

                }
                catch (Exception ex)
                {
                    status = ex.Message;
                }
            }

            return status;
        }

        public async Task<string> UseAdvanceByVoucher(UseAdvanceDomainModel advance)
        {
            string status = "";
            int condition = 0;
            if (condition > 0)
            {
                List<tblAdvance> uList = new List<tblAdvance>();
                uList = await advanceRepository.GetAll();
            }

            using (abuhamzapetstoreEntities db = new abuhamzapetstoreEntities())
            {
                try
                {
                    //var result = db.stpUseAdvance(advance.voucherNo,advance.totalAdvance,advance.remainingAdvance);
                }
                catch (Exception ex)
                {
                    status = ex.Message;
                }
            }

            return status;
        }

        public async Task<string> UpdateAdvanceByVoucher(UpdateAdvanceDomainModel advance)
        {
            string status = "";
            int condition = 0;
            if (condition > 0)
            {
                List<tblAdvance> uList = new List<tblAdvance>();
                uList = await advanceRepository.GetAll();
            }

            using (abuhamzapetstoreEntities db = new abuhamzapetstoreEntities())
            {
                try
                {
                    var result = db.stpUpdateAdvance(advance.voucherNo, advance.amount,advance.transactionType);
                }
                catch (Exception ex)
                {
                    status = ex.Message;
                }
            }

            return status;
        }
    }
}
