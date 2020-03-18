using abuhamza.business.Interface;
using abuhamza.domain;
using abuhamza.repository;
using abuhamza.repository.Infrastructure.Contract;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.business
{
    public class ReportBusiness : IReportBusiness
    {

        //public Task<DashboardDomainModel> GetDashboardData()
        //{
        //    DashboardDomainModel dashboardDomainModel = new DashboardDomainModel();
        //    abuhamzapetstoreEntities db = new abuhamzapetstoreEntities();

        //    DataTable dt = new DataTable();
        //    List<dynamic> list = new List<dynamic>();
        //    using (SqlConnection conn = new SqlConnection(@"data source=DESKTOP-TCM883N\SQLEXPRESS;initial catalog=abuhamzapetstore;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework"))
        //    using (SqlCommand cmd = new SqlCommand("stpGetDashboardData", conn))
        //    {
        //        SqlDataAdapter adapt = new SqlDataAdapter(cmd);
        //        adapt.SelectCommand.CommandType = CommandType.StoredProcedure;
        //        adapt.Fill(dt);
        //    }
        //    foreach (DataRow row in dt.Rows)
        //    {
        //        dashboardDomainModel.cashInDrawer = Convert.ToDecimal(row["CashInDrawer"]);
        //        dashboardDomainModel.pettyCash = Convert.ToDecimal(row["PettyCash"]);
        //        dashboardDomainModel.purchases = Convert.ToDecimal(row["Purchases"]);
        //        dashboardDomainModel.totalPurchase = Convert.ToDecimal(row["TotalPurchase"]);
        //        dashboardDomainModel.totalSale = Convert.ToDecimal(row["TotalSale"]);
        //        dashboardDomainModel.sales = Convert.ToDecimal(row["Sales"]);
        //        dashboardDomainModel.loans = Convert.ToDecimal(row["Loans"]);
        //        dashboardDomainModel.advances = Convert.ToDecimal(row["Advances"]);
        //        dashboardDomainModel.purchasePendings = Convert.ToDecimal(row["PurchasePendings"]);
        //        dashboardDomainModel.totalSuppliers = Convert.ToInt32(row["TotalSuppliers"]);
        //        dashboardDomainModel.totalCustomers = Convert.ToInt32(row["TotalCustomers"]);
        //    }
        //    return dashboardDomainModel;
        //}
    }
}
