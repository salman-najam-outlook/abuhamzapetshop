//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace abuhamza.repository
{
    using System;
    
    public partial class stpGetPendingAdvanceVouchers_Result
    {
        public int vch_id { get; set; }
        public string vchNo { get; set; }
        public Nullable<System.DateTime> date { get; set; }
        public Nullable<decimal> pendingAmount { get; set; }
        public Nullable<decimal> paidAmount { get; set; }
        public Nullable<decimal> totalAmount { get; set; }
        public string status { get; set; }
        public string vchType { get; set; }
        public string SupplierName { get; set; }
    }
}
