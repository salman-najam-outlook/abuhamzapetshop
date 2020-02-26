using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class EmployeeToReturnVM
    {
        public int emp_id { get; set; }
        public string name { get; set; }
        public string NIC { get; set; }
        public string address { get; set; }
        public string contact { get; set; }
        public Nullable<decimal> salary { get; set; }
        public Nullable<System.DateTime> date { get; set; }
    }
}