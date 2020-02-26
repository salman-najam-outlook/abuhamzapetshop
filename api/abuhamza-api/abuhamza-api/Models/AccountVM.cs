using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class AccountVM
    {
        public int acc_id { get; set; }
        public string name { get; set; }
        public Nullable<int> AccType_id { get; set; }
        public Nullable<decimal> balance { get; set; }

        //public virtual tblAccType tblAccType { get; set; }
        //[System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        //public virtual ICollection<tblTransaction> tblTransactions { get; set; }
    }
}