using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class DetailOrderVM
    {
        public int detailOrder_id { get; set; }
        public Nullable<int> order_id { get; set; }
        public Nullable<int> pro_id { get; set; }
        public string barcode { get; set; }
        public Nullable<int> quantity { get; set; }
        public Nullable<decimal> purchasePrice { get; set; }

        //public virtual tblProduct tblProduct { get; set; }
        //public virtual tblPurchaseOrder tblPurchaseOrder { get; set; }
    }
}