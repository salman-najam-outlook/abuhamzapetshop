using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class AdvanceRecord
    {
        public Nullable<System.DateTime> date { get; set; }
        public Nullable<decimal> amount { get; set; }
        public string barcode { get; set; }
        public string cus_No { get; set; }
        public string description { get; set; }
        public string cus_Name { get; set; }
        public string voucherNo { get; set; }
    }
}