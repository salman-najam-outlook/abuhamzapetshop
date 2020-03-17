using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class UpdateAdvance
    {
        public string voucherNo { get; set; }
        public decimal totalAdvance { get; set; }
        public decimal remainingAdvance { get; set; }
    }
}