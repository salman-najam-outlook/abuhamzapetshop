using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.domain
{
    public class InvoiceDomainModel
    {
        public int invoice_id { get; set; }
        public Nullable<System.DateTime> date { get; set; }
        public Nullable<int> totalQty { get; set; }
        public Nullable<decimal> discount { get; set; }
        public Nullable<decimal> totalAmount { get; set; }
        public Nullable<decimal> AmountTendered { get; set; }
        public Nullable<decimal> change { get; set; }
        public Nullable<int> user_id { get; set; }
        public Nullable<int> tra_id { get; set; }
        public string voucherNo { get; set; }
        //public virtual tblUser tblUser { get; set; }
    }
}
