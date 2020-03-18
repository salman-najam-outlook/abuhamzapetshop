﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class LoanRecord
    {
        public string vchNo { get; set; }
        public Nullable<System.DateTime> date { get; set; }
        public Nullable<decimal> pendingAmount { get; set; }
        public Nullable<decimal> paidAmount { get; set; }
        public Nullable<decimal> totalAmount { get; set; }
        public string status { get; set; }
        public string vchType { get; set; }
        public string description { get; set; }
        public string customerName { get; set; }
        public string customerNo { get; set; }
    }
}