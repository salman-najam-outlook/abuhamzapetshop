using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class SalaryToReturnVM
    {
        public int sal_id { get; set; }
        public Nullable<System.DateTime> date { get; set; }
        public Nullable<int> emp_id { get; set; }
        public Nullable<decimal> amount { get; set; }
    }
}