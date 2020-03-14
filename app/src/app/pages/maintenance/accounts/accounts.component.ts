import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from '../../../models/account.model';
import { MaintenanceService } from '../../../services/maintenance.service';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
})
export class AccountsComponent implements OnInit {
  accountForm: FormGroup;
  account: Account;

  constructor(private maintenanceService: MaintenanceService, private toastrService: NbToastrService) {}

  // Toaster Setting Starts
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  // Toaster Setting Ends

  ngOnInit() {
    this.accountForm = new FormGroup({
      accountType: new FormControl('', Validators.required),
      accountName: new FormControl('', Validators.required),
      accountBalance: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.account = new Account();
    this.account.acc_id = 0;
    this.account.AccType_id = +this.accountForm.controls.accountType.value;
    this.account.name = this.accountForm.controls.accountName.value;
    this.account.balance = this.accountForm.controls.accountBalance.value;
    this.maintenanceService.addUpdateAccount(this.account).subscribe(
      response => {
        this.showToast(
            'success',
            'Success!',
            'New Account has been added successfully.',
          );
      },
      error => {
        this.showToast(
            'danger',
            'Error!',
            'An error occured while adding new account.',
          );
      },
    );
  }

  onClear() {
      this.accountForm.reset();
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
