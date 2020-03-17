using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class PaymentVoucher
    {
        public string voucherNumber { get; set; }
        public decimal amountPaid { get; set; }
        public int supplierId { get; set; }
        public decimal remaingAmount { get; set; }
    }
}