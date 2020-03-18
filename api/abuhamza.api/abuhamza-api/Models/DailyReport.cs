using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace abuhamza_api.Models
{
    public class DailyReport
    {
        public decimal cashInDrawer { get; set; }
        public decimal pettyCash { get; set; }
        public decimal totalExpenses { get; set; }
        public decimal totalPurchase { get; set; }
        public decimal totalSale { get; set; }
        public decimal totalLoans { get; set; }
        public decimal totalAdvances { get; set; }
        public decimal totalPurchasePendings { get; set; }
        public List<SaleRecord> saleRecordList { get; set; }
        public List<PurchaseRecord> purchaseRecordList { get; set; }
        public List<AdvanceRecord> advanceRecordList { get; set; }
        public List<ExpenseRecord> expenseRecordList { get; set; }
        public List<LoanRecord> loanRecordList { get; set; }
        public List<PurchasePending> purchasePendingList { get; set; }
    }
}