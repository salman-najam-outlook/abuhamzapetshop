using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class SaleOrder
    {
        public Nullable<System.DateTime> date { get; set; } = DateTime.Now;
        public Nullable<int> totalQty { get; set; }
        public Nullable<decimal> tax { get; set; }
        public Nullable<decimal> subTotal { get; set; }
        public Nullable<decimal> discount { get; set; }
        public Nullable<decimal> grandTotal { get; set; }
        public Nullable<decimal> tenderAmount { get; set; }
        public Nullable<decimal> remainingCash { get; set; }

        public List<SingleProduct> singleProductList { get; set; }
    }
}