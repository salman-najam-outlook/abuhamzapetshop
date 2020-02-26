using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class ProductVM
    {
        public int pro_id { get; set; }
        public string barcode { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public Nullable<decimal> purchase_price { get; set; }
        public Nullable<decimal> sell_price { get; set; }
        public Nullable<long> quantity { get; set; }
        public Nullable<int> fsubCat_id { get; set; }
        public Nullable<int> subCat_id { get; set; }
        public Nullable<int> cat_id { get; set; }
        public Nullable<int> mainCat_id { get; set; }

        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<tblDetailOrder> tblDetailOrders { get; set; }
        //public virtual tblSubCategory tblSubCategory { get; set; }
    }
}