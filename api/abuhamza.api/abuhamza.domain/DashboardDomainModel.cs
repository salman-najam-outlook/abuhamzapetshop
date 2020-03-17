using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace abuhamza.domain
{
    public class DashboardDomainModel
    {
        public decimal cashInDrawer { get; set; }
        public decimal pettyCash { get; set; }
        public decimal expenses { get; set; }
        public decimal purchases { get; set; }
        public decimal totalPurchase { get; set; }
        public decimal totalSale { get; set; }
        public decimal sales { get; set; }
        public decimal loans { get; set; }
        public decimal advances { get; set; }
        public decimal purchasePendings { get; set; }
        public int totalSuppliers { get; set; }
        public int totalCustomers { get; set; }
    }
}
