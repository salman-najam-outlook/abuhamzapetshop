import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from '../../../models/account.model';
import { MaintenanceService } from '../../../services/maintenance.service';
import { CashTransaction } from '../../../models/cashTransaction.model';
import {
  NbGlobalPosition,
  NbGlobalPhysicalPosition,
  NbComponentStatus,
  NbToastrService,
} from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  transactionsForm: FormGroup;
  account: Account;
  cashTransactionModel: CashTransaction;
  toAccounts: Account[];
  fromAccounts: Account[];

  constructor(
    private maintenanceService: MaintenanceService,
    private toastrService: NbToastrService,
    private router: Router,
  ) {}

  // Toaster Setting Starts
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  // Toaster Setting Ends

  ngOnInit() {
    this.transactionsForm = new FormGroup({
      fromAccount: new FormControl('', Validators.required),
      toAccount: new FormControl('', Validators.required),
      description: new FormControl(''),
      amount: new FormControl('', Validators.required),
    });
    this.maintenanceService.GetToAccounts().subscribe(
      response => {
        this.toAccounts = response;
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
            'An error occured while fetching ToAccounts.',
          );
        }
      },
    );
    this.maintenanceService.GetFromAccounts().subscribe(
      response => {
        this.fromAccounts = response;
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
            'An error occured while fetching FromAccounts.',
          );
        }
      },
    );
  }

  onSubmit() {
    this.cashTransactionModel = new CashTransaction();
    this.cashTransactionModel.debitor_Account_Id = this.transactionsForm.controls.toAccount.value;
    this.cashTransactionModel.creditor_Account_Id = this.transactionsForm.controls.fromAccount.value;
    this.cashTransactionModel.voucherAmount = this.transactionsForm.controls.amount.value;
    this.cashTransactionModel.description = this.transactionsForm.controls.description.value;
    this.maintenanceService.sendAmount(this.cashTransactionModel).subscribe(
      response => {
        this.transactionsForm.reset();
        this.showToast('success', 'Success!', 'Transaction has been done!');
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
            'An error occured while transaction!',
          );
        }
      },
    );
  }

  onClear() {
    this.transactionsForm.reset();
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
