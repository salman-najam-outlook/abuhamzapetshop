using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class AdvanceToReturnVM
    {
        public int advance_id { get; set; }
        public Nullable<System.DateTime> date { get; set; }
        public Nullable<decimal> amount { get; set; }
        public Nullable<int> cus_id { get; set; }
        public string barcode { get; set; }
        public string cus_No { get; set; }
        public string cus_Name { get; set; }
        public string description { get; set; }
    }
}