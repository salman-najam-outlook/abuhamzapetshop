using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class VoucherVM
    {
        public int vch_id { get; set; }
        public string vchNo { get; set; }
        public Nullable<System.DateTime> date { get; set; }
        public Nullable<decimal> pendingAmount { get; set; }
        public Nullable<decimal> paidAmount { get; set; }
        public Nullable<decimal> totalAmount { get; set; }
        public string status { get; set; }
        public Nullable<decimal> recievedAmount { get; set; }
        public string vchType { get; set; }
    }
}