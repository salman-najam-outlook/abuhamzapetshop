using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.domain
{
    public class SaleOrderDomainModel
    {
        public Nullable<System.DateTime> date { get; set; } = DateTime.Now;
        public Nullable<int> totalQty { get; set; }
        public Nullable<decimal> tax { get; set; }
        public Nullable<decimal> subTotal { get; set; }
        public Nullable<decimal> discount { get; set; }
        public Nullable<decimal> grandTotal { get; set; }
        public Nullable<decimal> tenderAmount { get; set; }
        public Nullable<decimal> remainingCash { get; set; }
        public string cus_No { get; set; }
        public bool isAdvanceVisible { get; set; }
        public string voucherNo { get; set; }
        public decimal totalAdvance { get; set; }
        public decimal remainingAdvance { get; set; }
        public List<SingleProductDomainModel> singleProductList { get; set; }
    }
}
