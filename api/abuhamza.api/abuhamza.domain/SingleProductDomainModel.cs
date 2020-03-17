using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.domain
{
    public class SingleProductDomainModel
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
