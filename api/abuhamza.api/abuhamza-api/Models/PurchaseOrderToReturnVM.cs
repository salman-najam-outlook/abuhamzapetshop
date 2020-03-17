using abuhamza.repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class PurchaseOrderToReturnVM
    {
        public int order_id { get; set; }
        public Nullable<System.DateTime> date { get; set; } = DateTime.Now;
        public Nullable<decimal> totalAmount { get; set; }
        public Nullable<int> supplier { get; set; }
        public string status { get; set; }
        public string voucherNo { get; set; }
        public Nullable<decimal> paidAmount { get; set; }
        public string orderDesc { get; set; }
        public Nullable<int> creditorAcc_Id { get; set; }

        public List<DetailOrderVM> DetailOrders { get; set; }
    }
}