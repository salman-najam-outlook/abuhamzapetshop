using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.domain
{
    public class VoucherDomainModel
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
