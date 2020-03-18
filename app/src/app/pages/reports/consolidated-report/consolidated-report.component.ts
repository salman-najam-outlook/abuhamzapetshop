import { Component, OnInit } from '@angular/core';

import { NbToastrService, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus } from '@nebular/theme';
import { ReportService } from '../../../services/report.service';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { MaintenanceService } from '../../../services/maintenance.service';
import { DailyReportModel } from '../../../models/reports/dailyReport.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-consolidated-reports',
  styleUrls: ['./consolidated-report.component.scss'],
  templateUrl: './consolidated-report.component.html'
})

export class ConsolidatedReportComponent implements OnInit {
  dailyReport: DailyReportModel;

    // Toaster Setting Starts
    index = 1;
    destroyByClick = true;
    duration = 5000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
    // Toaster Setting Ends

  constructor(
    private reportService: ReportService,
    private router: Router,
    private toastrService: NbToastrService,
    private maintenanceService: MaintenanceService,
    private datePipe: DatePipe,
  ) {}

  saleRecordListSetting = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      vchNo: {
        title: 'Voucher No.',
        type: 'string',
        filter: false,
      },
      date: {
        title: 'Date',
        type: 'date',
        editable: false,
        addable: false,
        filter: false,
        valuePrepareFunction: date => {
          return this.datePipe.transform(new Date(date), 'dd MMM yyyy');
        },
      },
      status: {
        title: 'Status',
        type: 'string',
        filter: false,
      },
      vchType: {
        title: 'Voucher Type',
        type: 'string',
        filter: false,
      },
      pendingAmount: {
        title: 'Pending Amount',
        type: 'number',
        filter: false,
      },
      paidAmount: {
        title: 'Paid Amount',
        type: 'number',
        filter: false,
      },
      totalAmount: {
        title: 'Total Amount',
        type: 'number',
        filter: false,
      },
      description: {
        title: 'Description',
        type: 'string',
        width: '25%',
        filter: false,
      },
    },
  };

  purchaseRecordListSetting = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      vchNo: {
        title: 'Voucher No.',
        type: 'string',
        filter: false,
      },
      date: {
        title: 'Date',
        type: 'date',
        editable: false,
        filter: false,
        addable: false,
        valuePrepareFunction: date => {
          return this.datePipe.transform(new Date(date), 'dd MMM yyyy');
        },
      },
      status: {
        title: 'Status',
        type: 'string',
        filter: false,
      },
      vchType: {
        title: 'Voucher Type',
        type: 'string',
        filter: false,
      },
      pendingAmount: {
        title: 'Pending Amount',
        type: 'number',
        filter: false,
      },
      paidAmount: {
        title: 'Paid Amount',
        type: 'number',
        filter: false,
      },
      totalAmount: {
        title: 'Total Amount',
        type: 'number',
        filter: false,
      },
      description: {
        title: 'Description',
        type: 'string',
        width: '25%',
        filter: false,
      },
    },
  };

  advanceRecordListSettings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      voucherNo: {
        title: 'Voucher No.',
        type: 'string',
        filter: false,
      },
      date: {
        title: 'Date',
        type: 'date',
        editable: false,
        filter: false,
        addable: false,
        valuePrepareFunction: date => {
          return this.datePipe.transform(new Date(date), 'dd MMM yyyy');
        },
      },
      barcode: {
        title: 'Barcode',
        type: 'string',
        filter: false,
      },
      cus_Name: {
        title: 'Customer Name',
        type: 'number',
        filter: false,
      },
      cus_No: {
        title: 'Customer No.',
        type: 'string',
        filter: false,
      },
      amount: {
        title: 'Amount',
        type: 'number',
        filter: false,
      },
      description: {
        title: 'Description',
        type: 'string',
        width: '25%',
        filter: false,
      },
    },
  };

  expenseRecordListSettings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      date: {
        title: 'Date',
        type: 'date',
        editable: false,
        filter: false,
        addable: false,
        valuePrepareFunction: date => {
          return this.datePipe.transform(new Date(date), 'dd MMM yyyy');
        },
      },
      pendingAmount: {
        title: 'Pending Amount',
        type: 'number',
        filter: false,
      },
      paidAmount: {
        title: 'Paid Amount',
        type: 'number',
        filter: false,
      },
      totalAmount: {
        title: 'Total Amount',
        type: 'number',
        filter: false,
      },
      status: {
        title: 'Status',
        type: 'string',
        filter: false,
      },
      vchType: {
        title: 'Voucher Type',
        type: 'string',
        filter: false,
      },
      description: {
        title: 'Description',
        type: 'string',
        width: '25%',
        filter: false,
      },
    },
  };

  loanRecordListSettings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      vchNo: {
        title: 'Voucher No.',
        type: 'string',
        filter: false,
      },
      date: {
        title: 'Date',
        type: 'date',
        editable: false,
        filter: false,
        addable: false,
        valuePrepareFunction: date => {
          return this.datePipe.transform(new Date(date), 'dd MMM yyyy');
        },
      },
      status: {
        title: 'Status',
        type: 'string',
        filter: false,
      },
      vchType: {
        title: 'Voucher Type',
        type: 'string',
        filter: false,
      },
      customerName: {
        title: 'Customer Name',
        type: 'string',
        filter: false,
      },
      customerNo: {
        title: 'Customer No.',
        type: 'string',
        filter: false,
      },
      pendingAmount: {
        title: 'Pending Amount',
        type: 'number',
        filter: false,
      },
      paidAmount: {
        title: 'Paid Amount',
        type: 'number',
        filter: false,
      },
      totalAmount: {
        title: 'Total Amount',
        type: 'number',
        filter: false,
      },
      description: {
        title: 'Description',
        type: 'string',
        width: '25%',
        filter: false,
      },
    },
  };

  purchasePendingListSettings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      vchNo: {
        title: 'Voucher No.',
        type: 'string',
        filter: false,
      },
      date: {
        title: 'Date',
        type: 'date',
        editable: false,
        filter: false,
        addable: false,
        valuePrepareFunction: date => {
          return this.datePipe.transform(new Date(date), 'dd MMM yyyy');
        },
      },
      status: {
        title: 'Status',
        type: 'string',
        filter: false,
      },
      vchType: {
        title: 'Voucher Type',
        type: 'string',
        filter: false,
      },
      supplierName: {
        title: 'Supplier Name',
        type: 'string',
        filter: false,
      },
      supplierNo: {
        title: 'Supplier No.',
        type: 'string',
        filter: false,
      },
      pendingAmount: {
        title: 'Pending Amount',
        type: 'number',
        filter: false,
      },
      paidAmount: {
        title: 'Paid Amount',
        type: 'number',
        filter: false,
      },
      totalAmount: {
        title: 'Total Amount',
        type: 'number',
        filter: false,
      },
      description: {
        title: 'Description',
        type: 'string',
        width: '25%',
        filter: false,
      },
    },
  };

  saleRecordListSource: LocalDataSource = new LocalDataSource();
  purchaseRecordListSource: LocalDataSource = new LocalDataSource();
  advanceRecordListSource: LocalDataSource = new LocalDataSource();
  expenseRecordListSource: LocalDataSource = new LocalDataSource();
  loanRecordListSource: LocalDataSource = new LocalDataSource();
  purchasePendingListSource: LocalDataSource = new LocalDataSource();

  ngOnInit() {
    this.reportService.getDailyReportData().subscribe(
      response => {
        this.saleRecordListSource.load(response.saleRecordList);
        this.purchaseRecordListSource.load(response.purchaseRecordList);
        this.advanceRecordListSource.load(response.advanceRecordList);
        this.expenseRecordListSource.load(response.expenseRecordList);
        this.loanRecordListSource.load(response.loanRecordList);
        this.purchasePendingListSource.load(response.purchasePendingList);
      },
      error => {
        if (error.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('expires');
          localStorage.removeItem('user');
          this.router.navigate(['auth'], {
            queryParams: {
              isSessionExpired: true,
            },
          });
        } else {
            this.showToast(
              'danger',
              'Error!',
              'An error occured while fetching Daily Report data.',
            );
        }
      },
    );
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
