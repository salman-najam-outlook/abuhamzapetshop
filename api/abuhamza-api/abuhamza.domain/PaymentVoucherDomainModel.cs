using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.domain
{
    public class PaymentVoucherDomainModel
    {
        public string voucherNumber { get; set; }
        public decimal amountPaid { get; set; }
        public int supplierId { get; set; }
        public decimal remaingAmount { get; set; }
    }
}
