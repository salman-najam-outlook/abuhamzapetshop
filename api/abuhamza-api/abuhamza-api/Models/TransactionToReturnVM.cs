using abuhamza.repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class TransactionToReturnVM
    {
        public int tra_id { get; set; }
        public string tra_type { get; set; }
        public string voucherNo { get; set; }
        public Nullable<int> acc_id { get; set; }
        public string description { get; set; }
        public Nullable<decimal> totalAmount { get; set; }
        public Nullable<int> user_id { get; set; }
        public Nullable<int> totalQty { get; set; }
        public string barcode { get; set; }

        public virtual tblAccount tblAccount { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tblDetailTransaction> tblDetailTransactions { get; set; }
    }
}