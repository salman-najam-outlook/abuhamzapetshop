using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class CashTransaction
    {
        public int debitor_Account_Id { get; set; }
        public int creditor_Account_Id { get; set; }
        public decimal voucherAmount { get; set; }
        public string description { get; set; }
    }
}