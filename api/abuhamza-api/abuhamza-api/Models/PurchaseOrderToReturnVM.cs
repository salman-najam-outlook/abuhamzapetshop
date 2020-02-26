using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class PurchaseOrderToReturnVM
    {
        public int order_id { get; set; }
        public Nullable<System.DateTime> date { get; set; }
        public Nullable<decimal> totalAmount { get; set; }
        public Nullable<int> sup_id { get; set; }
        public string status { get; set; }
        public string voucherNo { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<tblDetailOrder> tblDetailOrders { get; set; }
    }
}