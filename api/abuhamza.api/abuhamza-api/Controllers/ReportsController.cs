using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using abuhamza.business.Interface;
using abuhamza.domain;
using abuhamza.repository;
using abuhamza_api.datasets;
using abuhamza_api.Models;
//using CrystalDecisions.CrystalReports.Engine;

namespace abuhamza_api.Controllers
{
    [Authorize]
    public class ReportsController : ApiController
    {

        //IReportBusiness reportBusiness;

        //public ReportsController(IReportBusiness _reportBusiness)
        //{
        //    //reportBusiness = _reportBusiness;
        //}

        //// api/users/GetAllAccounts
        //// This Api call will get all accounts from the database
        //[HttpGet]
        //[Route("api/reports/GetAllInvoices")]
        //public HttpResponseMessage GetAllInvoices()
        //{
        //    HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
        //    abuhamzapetstoreEntities db = new abuhamzapetstoreEntities();
        //    db.Configuration.ProxyCreationEnabled = false;
        //    ReportDocument crystalReport = new ReportDocument();
            //crystalReport.Load(Microsoft.SqlServer.Server.MapPath("~/CustomerReport.rpt"));
            //crystalReport.Load(System.Web.Hosting.HostingEnvironment.MapPath("~/reports/TestReport.rpt"));

            //dtstTest dtst = new dtstTest();
            //DataTable dt = new DataTable();
            //using (SqlConnection conn = new SqlConnection(@"data source=DESKTOP-TCM883N\SQLEXPRESS;initial catalog=abuhamzapetstore;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework"))
            //using (SqlCommand cmd = new SqlCommand("stpGetAllInvoices", conn))
            //{
            //    SqlDataAdapter adapt = new SqlDataAdapter(cmd);
            //    adapt.SelectCommand.CommandType = CommandType.StoredProcedure;
            //    adapt.Fill(dt);
            //}

            //crystalReport.SetDataSource(dt);

            //HttpResponseMessage httpResponseMessage2 = new HttpResponseMessage();

        //    Stream stream = crystalReport.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
        //    stream.Seek(0, SeekOrigin.Begin);
        //    httpResponseMessage.Content = new StreamContent(stream);
        //    httpResponseMessage.Content.Headers.Add("x-filename", "Report.pdf");
        //    httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
        //    httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
        //    httpResponseMessage.Content.Headers.ContentDisposition.FileName = "InvoicesReport.pdf";

        //    httpResponseMessage.StatusCode = HttpStatusCode.OK;

        //    return httpResponseMessage;
        //}

        // api/users/GetAllAccounts
        // This Api call will get all accounts from the database

        [HttpGet]
        [Route("api/reports/GetDashboardData")]
        public DashboardDomainModel GetDashboardData()
        {
            DashboardDomainModel dashboardDomainModel = new DashboardDomainModel();
            abuhamzapetstoreEntities db = new abuhamzapetstoreEntities();

            DataTable dt = new DataTable();
            List<dynamic> list = new List<dynamic>();
            using (SqlConnection conn = new SqlConnection(@"data source=DESKTOP-TCM883N\SQLEXPRESS;initial catalog=abuhamzapetstore;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework"))
            using (SqlCommand cmd = new SqlCommand("stpGetDashboardData", conn))
            {
                SqlDataAdapter adapt = new SqlDataAdapter(cmd);
                adapt.SelectCommand.CommandType = CommandType.StoredProcedure;
                adapt.Fill(dt);
            }
            foreach (DataRow row in dt.Rows)
            {
                dashboardDomainModel.cashInDrawer = Convert.ToDecimal(row["CashInDrawer"]);
                dashboardDomainModel.pettyCash = Convert.ToDecimal(row["PettyCash"]);
                dashboardDomainModel.purchases = Convert.ToDecimal(row["Purchases"]);
                dashboardDomainModel.expenses = Convert.ToDecimal(row["Expenses"]);
                dashboardDomainModel.totalPurchase = Convert.ToDecimal(row["TotalPurchase"]);
                dashboardDomainModel.totalSale = Convert.ToDecimal(row["TotalSale"]);
                dashboardDomainModel.sales = Convert.ToDecimal(row["Sales"]);
                dashboardDomainModel.loans = Convert.ToDecimal(row["Loans"]);
                dashboardDomainModel.advances = Convert.ToDecimal(row["Advances"]);
                dashboardDomainModel.purchasePendings = Convert.ToDecimal(row["PurchasePendings"]);
                dashboardDomainModel.totalSuppliers = Convert.ToInt32(row["TotalSuppliers"]);
                dashboardDomainModel.totalCustomers = Convert.ToInt32(row["TotalCustomers"]);
            }
            return dashboardDomainModel;
        }


        [HttpGet]
        [Route("api/reports/DailyReport")]
        public DailyReport DailyReport()
        {
            DailyReport dailyReport                     = new DailyReport();
            List<SaleRecord> saleRecordList             = new List<SaleRecord>();
            List<PurchaseRecord> purchaseRecordList     = new List<PurchaseRecord>();
            List<AdvanceRecord> advanceRecordList       = new List<AdvanceRecord>();
            List<ExpenseRecord> expenseRecordList       = new List<ExpenseRecord>();
            List<LoanRecord> loanRecordList             = new List<LoanRecord>();
            List<PurchasePending> purchasePendingList   = new List<PurchasePending>();




            abuhamzapetstoreEntities db = new abuhamzapetstoreEntities();

            DataTable dt = new DataTable();

            using (SqlConnection conn = new SqlConnection(@"data source=DESKTOP-TCM883N\SQLEXPRESS;initial catalog=abuhamzapetstore;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework"))
            using (SqlCommand cmd = new SqlCommand("stpGetSaleRecord", conn))
            {
                SqlDataAdapter adapt = new SqlDataAdapter(cmd);
                adapt.SelectCommand.CommandType = CommandType.StoredProcedure;
                adapt.Fill(dt);
            }

            saleRecordList = (from DataRow dr in dt.Rows
                      select new SaleRecord()
                      {
                          vchNo = dr["vchNo"].ToString(),
                          date = Convert.ToDateTime(dr["date"]),
                          pendingAmount = Convert.ToDecimal(dr["pendingAmount"]),
                          paidAmount = Convert.ToDecimal(dr["paidAmount"]),
                          totalAmount = Convert.ToDecimal(dr["totalAmount"]),
                          status = dr["status"].ToString(),
                          vchType = dr["vchType"].ToString(),
                          description = dr["description"].ToString()
                      }).ToList();
            dt.Clear();

            //-------------------------------------------------------------------------------------------

            using (SqlConnection conn = new SqlConnection(@"data source=DESKTOP-TCM883N\SQLEXPRESS;initial catalog=abuhamzapetstore;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework"))
            using (SqlCommand cmd = new SqlCommand("stpGetPurchaseRecord", conn))
            {
                SqlDataAdapter adapt = new SqlDataAdapter(cmd);
                adapt.SelectCommand.CommandType = CommandType.StoredProcedure;
                adapt.Fill(dt);
            }

            purchaseRecordList = (from DataRow dr in dt.Rows
                              select new PurchaseRecord()
                              {
                                  vchNo = dr["vchNo"].ToString(),
                                  date = Convert.ToDateTime(dr["date"]),
                                  pendingAmount = Convert.ToDecimal(dr["pendingAmount"]),
                                  paidAmount = Convert.ToDecimal(dr["paidAmount"]),
                                  totalAmount = Convert.ToDecimal(dr["totalAmount"]),
                                  status = dr["status"].ToString(),
                                  vchType = dr["vchType"].ToString(),
                                  description = dr["description"].ToString()
                              }).ToList();
            dt.Clear();

            //-------------------------------------------------------------------------------------------

            using (SqlConnection conn = new SqlConnection(@"data source=DESKTOP-TCM883N\SQLEXPRESS;initial catalog=abuhamzapetstore;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework"))
            using (SqlCommand cmd = new SqlCommand("stpGetAdvanceRecord", conn))
            {
                SqlDataAdapter adapt = new SqlDataAdapter(cmd);
                adapt.SelectCommand.CommandType = CommandType.StoredProcedure;
                adapt.Fill(dt);
            }

            advanceRecordList = (from DataRow dr in dt.Rows
                                  select new AdvanceRecord()
                                  {
                                      voucherNo = dr["voucherNo"].ToString(),
                                      date = Convert.ToDateTime(dr["date"]),
                                      amount = Convert.ToDecimal(dr["amount"]),
                                      barcode = dr["barcode"].ToString(),
                                      cus_No = dr["cus_No"].ToString(),
                                      cus_Name = dr["cus_Name"].ToString(),
                                      description = dr["description"].ToString()
                                  }).ToList();
            dt.Clear();

            //-------------------------------------------------------------------------------------------

            using (SqlConnection conn = new SqlConnection(@"data source=DESKTOP-TCM883N\SQLEXPRESS;initial catalog=abuhamzapetstore;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework"))
            using (SqlCommand cmd = new SqlCommand("stpGetExpenseRecord", conn))
            {
                SqlDataAdapter adapt = new SqlDataAdapter(cmd);
                adapt.SelectCommand.CommandType = CommandType.StoredProcedure;
                adapt.Fill(dt);
            }

            expenseRecordList = (from DataRow dr in dt.Rows
                                  select new ExpenseRecord()
                                  {
                                      vchNo = dr["vchNo"].ToString(),
                                      date = Convert.ToDateTime(dr["date"]),
                                      pendingAmount = Convert.ToDecimal(dr["pendingAmount"]),
                                      paidAmount = Convert.ToDecimal(dr["paidAmount"]),
                                      totalAmount = Convert.ToDecimal(dr["totalAmount"]),
                                      status = dr["status"].ToString(),
                                      vchType = dr["vchType"].ToString(),
                                      description = dr["description"].ToString()
                                  }).ToList();
            dt.Clear();

            //-------------------------------------------------------------------------------------------

            using (SqlConnection conn = new SqlConnection(@"data source=DESKTOP-TCM883N\SQLEXPRESS;initial catalog=abuhamzapetstore;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework"))
            using (SqlCommand cmd = new SqlCommand("stpGetLoanRecord", conn))
            {
                SqlDataAdapter adapt = new SqlDataAdapter(cmd);
                adapt.SelectCommand.CommandType = CommandType.StoredProcedure;
                adapt.Fill(dt);
            }

            loanRecordList = (from DataRow dr in dt.Rows
                                 select new LoanRecord()
                                 {
                                     vchNo = dr["vchNo"].ToString(),
                                     date = Convert.ToDateTime(dr["date"]),
                                     pendingAmount = Convert.ToDecimal(dr["pendingAmount"]),
                                     paidAmount = Convert.ToDecimal(dr["paidAmount"]),
                                     totalAmount = Convert.ToDecimal(dr["totalAmount"]),
                                     status = dr["status"].ToString(),
                                     vchType = dr["vchType"].ToString(),
                                     customerName = dr["customerName"].ToString(),
                                     customerNo = dr["customerNo"].ToString(),
                                     description = dr["description"].ToString()
                                 }).ToList();
            dt.Clear();

            //-------------------------------------------------------------------------------------------

            using (SqlConnection conn = new SqlConnection(@"data source=DESKTOP-TCM883N\SQLEXPRESS;initial catalog=abuhamzapetstore;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework"))
            using (SqlCommand cmd = new SqlCommand("stpGetPurchasePendingRecord", conn))
            {
                SqlDataAdapter adapt = new SqlDataAdapter(cmd);
                adapt.SelectCommand.CommandType = CommandType.StoredProcedure;
                adapt.Fill(dt);
            }

            purchasePendingList = (from DataRow dr in dt.Rows
                              select new PurchasePending()
                              {
                                  vchNo = dr["vchNo"].ToString(),
                                  date = Convert.ToDateTime(dr["date"]),
                                  pendingAmount = Convert.ToDecimal(dr["pendingAmount"]),
                                  paidAmount = Convert.ToDecimal(dr["paidAmount"]),
                                  totalAmount = Convert.ToDecimal(dr["totalAmount"]),
                                  status = dr["status"].ToString(),
                                  vchType = dr["vchType"].ToString(),
                                  supplierNo = dr["supplierNo"].ToString(),
                                  supplierName = dr["supplierName"].ToString(),
                                  description = dr["description"].ToString()
                              }).ToList();
            dt.Clear();

            //-------------------------------------------------------------------------------------------
            
            using (SqlConnection conn = new SqlConnection(@"data source=DESKTOP-TCM883N\SQLEXPRESS;initial catalog=abuhamzapetstore;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework"))
            using (SqlCommand cmd = new SqlCommand("stpGetDailySummary", conn))
            {
                SqlDataAdapter adapt = new SqlDataAdapter(cmd);
                adapt.SelectCommand.CommandType = CommandType.StoredProcedure;
                adapt.Fill(dt);
            }
            foreach (DataRow row in dt.Rows)
            {
                dailyReport.cashInDrawer = Convert.ToDecimal(row["CashInDrawer"]);
                dailyReport.pettyCash = Convert.ToDecimal(row["PettyCash"]);
                dailyReport.totalExpenses = Convert.ToDecimal(row["TotalExpenses"]);
                dailyReport.totalPurchase = Convert.ToDecimal(row["TotalPurchase"]);
                dailyReport.totalSale = Convert.ToDecimal(row["TotalSale"]);
                dailyReport.totalLoans = Convert.ToDecimal(row["TotalLoans"]);
                dailyReport.totalAdvances = Convert.ToDecimal(row["TotalAdvances"]);
                dailyReport.totalPurchasePendings = Convert.ToDecimal(row["TotalPurchasePendings"]);
            }





            dailyReport.saleRecordList = saleRecordList;
            dailyReport.purchaseRecordList = purchaseRecordList;
            dailyReport.advanceRecordList = advanceRecordList;
            dailyReport.expenseRecordList = expenseRecordList;
            dailyReport.loanRecordList = loanRecordList;
            dailyReport.purchasePendingList = purchasePendingList;

            return dailyReport;
        }


        // api/vouchers/GetVoucherById/1
        // This Api call will get single voucher from the database based on acc_id
        //[HttpGet]
        //[Route("api/reports/GetDashboardData")]
        //public Task<DashboardDomainModel> GetDashboardData()
        //{
        //    DashboardDomainModel dashboardDomainModel = reportBusiness.GetDashboardData();
        //    return dashboardDomainModel;
        //}

    }
}
