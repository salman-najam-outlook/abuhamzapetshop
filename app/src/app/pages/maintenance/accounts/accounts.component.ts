import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from '../../../models/account.model';
import { MaintenanceService } from '../../../services/maintenance.service';

@Component({
    selector: "ngx-accounts",
    templateUrl: "./accounts.component.html",
    styleUrls: ["./accounts.component.scss"]
})
export class AccountsComponent implements OnInit {
    accountForm: FormGroup;
    account: Account;

    constructor(private maintenanceService: MaintenanceService) {}

    ngOnInit() {
        this.accountForm = new FormGroup({
            accountType: new FormControl("", Validators.required),
            accountName: new FormControl("", Validators.required),
            accountBalance: new FormControl("", Validators.required)
        });
    }

    onSubmit() {
        this.account = new Account();
        this.account.AccType_id = +this.accountForm.controls.accountType.value;
        this.account.name = this.accountForm.controls.accountName.value;
        this.account.balance = this.accountForm.controls.accountBalance.value;
        console.log(this.account);
        this.maintenanceService.addUpdateAccount(this.account).subscribe(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
            }
        );
    }
}