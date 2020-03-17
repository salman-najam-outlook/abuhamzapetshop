using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.domain
{
    public class VoucherDM
    {
        public int vch_id { get; set; }
        public string vchNo { get; set; }
        public DateTime date { get; set; }
        public decimal pendingAmount { get; set; }
        public decimal paidAmount { get; set; }
        public decimal totalAmount { get; set; }
        public string status { get; set; }
        public string vchType { get; set; }
        public string SupplierName { get; set; }
    }
}
