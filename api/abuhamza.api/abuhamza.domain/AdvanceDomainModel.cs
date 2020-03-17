﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.domain
{
    public class AdvanceDomainModel
    {
        public int advance_id { get; set; }
        public Nullable<System.DateTime> date { get; set; }
        public Nullable<decimal> amount { get; set; }
        public Nullable<int> cus_id { get; set; }
        public string barcode { get; set; }
        public string cus_No { get; set; }
        public string description { get; set; }
        public string voucherNo { get; set; }
        public string cus_Name { get; set; }
    }
}
