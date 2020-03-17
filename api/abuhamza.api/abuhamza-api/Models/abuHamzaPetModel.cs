using abuhamza.repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class abuHamzaPetModel
    {
        public int order_id { get; set; }
        public Nullable<System.DateTime> date { get; set; }
        public Nullable<decimal> totalAmount { get; set; }
        public Nullable<decimal> paidAmount { get; set; }
        public Nullable<int> sup_id { get; set; }
        public string status { get; set; }
        public string voucherNo { get; set; }

        public virtual List<tblDetailOrder> tblDetailOrders { get; set; }

        //public virtual SubCategory SubCategory { get; set; }
        //public virtual List<DefaultImage> Dimages { get; set; }
    }
}