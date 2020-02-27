using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.domain
{
    public class CashTransactionDomainModel
    {
        public int debitor_Account_Id { get; set; }
        public int creditor_Account_Id { get; set; }
        public decimal voucherAmount { get; set; }
        public string description { get; set; }
    }
}
