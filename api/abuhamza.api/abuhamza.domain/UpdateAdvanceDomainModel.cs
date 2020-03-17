using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.domain
{
    public class UpdateAdvanceDomainModel
    {
        public string voucherNo { get; set; }
        public decimal amount { get; set; }
        public string transactionType { get; set; }
    }
}
