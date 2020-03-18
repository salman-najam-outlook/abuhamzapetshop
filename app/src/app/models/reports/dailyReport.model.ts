import { SaleRecordList } from './saleRecordList.model';
import { PurchaseRecordList } from './purchaseRecordList.model';
import { AdvanceRecordList } from './advanceRecordList.model';
import { ExpenseRecordList } from './expenseRecordList.model';
import { LoanRecordList } from './loanRecordList.model';
import { PurchasePendingList } from './purchasePendingList.model';

export class DailyReportModel {
  saleRecordList: SaleRecordList[];
  purchaseRecordList: PurchaseRecordList[];
  advanceRecordList: AdvanceRecordList[];
  expenseRecordList: ExpenseRecordList[];
  loanRecordList: LoanRecordList[];
  purchasePendingList: PurchasePendingList[];
}
