using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class SingleProduct
    {
        public Nullable<int> saleOrder_id { get; set; }
        public string barcode { get; set; }
        public string productName { get; set; }
        public Nullable<int> quantity { get; set; }
        public Nullable<decimal> purchasePrice { get; set; }
        public Nullable<decimal> sellPrice { get; set; }
        public Nullable<decimal> totalAmount { get; set; }
    }
}