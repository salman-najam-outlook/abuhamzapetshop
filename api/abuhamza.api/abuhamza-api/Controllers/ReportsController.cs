using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
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
using CrystalDecisions.CrystalReports.Engine;

namespace abuhamza_api.Controllers
{
    [Authorize]
    public class ReportsController : ApiController
    {
        // api/users/GetAllAccounts
        // This Api call will get all accounts from the database
        [HttpGet]
        [Route("api/reports/GetAllInvoices")]
        public  HttpResponseMessage GetAllInvoices()
        {
            HttpResponseMessage httpResponseMessage = new HttpResponseMessage();
            abuhamzapetstoreEntities db = new abuhamzapetstoreEntities();
            db.Configuration.ProxyCreationEnabled = false;
            ReportDocument crystalReport = new ReportDocument();
            //crystalReport.Load(Microsoft.SqlServer.Server.MapPath("~/CustomerReport.rpt"));
            crystalReport.Load(System.Web.Hosting.HostingEnvironment.MapPath("~/reports/TestReport.rpt"));
            
            dtstTest dtst = new dtstTest();
            DataTable dt = new DataTable();
            using (SqlConnection conn = new SqlConnection(@"data source=DESKTOP-TCM883N\SQLEXPRESS;initial catalog=abuhamzapetstore;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework"))
            using (SqlCommand cmd = new SqlCommand("stpGetAllInvoices", conn))
            {
                SqlDataAdapter adapt = new SqlDataAdapter(cmd);
                adapt.SelectCommand.CommandType = CommandType.StoredProcedure;
                adapt.Fill(dt);
            }

           

            crystalReport.SetDataSource(dt);

            //HttpResponseMessage httpResponseMessage2 = new HttpResponseMessage();

            Stream stream = crystalReport.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
            stream.Seek(0, SeekOrigin.Begin);
            httpResponseMessage.Content = new StreamContent(stream);
            httpResponseMessage.Content.Headers.Add("x-filename", "Report.pdf");
            httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            httpResponseMessage.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            httpResponseMessage.Content.Headers.ContentDisposition.FileName = "InvoicesReport.pdf";

            httpResponseMessage.StatusCode = HttpStatusCode.OK;
            
            return httpResponseMessage;
        }

    }
}
