using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.domain
{
    public class SalaryDomainModel
    {
        public int sal_id { get; set; }
        public Nullable<System.DateTime> date { get; set; }
        public Nullable<int> emp_id { get; set; }
        public Nullable<decimal> amount { get; set; }
    }
}
