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
    using System.Collections.Generic;
    
    public partial class tblDetailTransaction
    {
        public int detailTra_id { get; set; }
        public string voucherNo { get; set; }
        public Nullable<decimal> pendingAmount { get; set; }
        public Nullable<decimal> paidAmount { get; set; }
        public Nullable<decimal> recievedAomunt { get; set; }
        public Nullable<int> tra_id { get; set; }
    
        public virtual tblTransaction tblTransaction { get; set; }
    }
}