import { Component, Input } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import { Customer } from "../../../../models/customer.model";
import { MaintenanceService } from "../../../../services/maintenance.service";
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPosition,
  NbGlobalPhysicalPosition
} from "@nebular/theme";

@Component({
  selector: "ngx-customers-add-model",
  templateUrl: "customers-add-model.component.html",
  styleUrls: ["customers-add-model.component.scss"]
})
export class CustomersAddComponent {
  customer?: Customer;
  constructor(
    protected ref: NbDialogRef<CustomersAddComponent>,
    private maintenanceService: MaintenanceService,
    private toastrService: NbToastrService
  ) {}

  // Toaster Setting Starts
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  // Toaster Setting Ends

  cancel() {
    this.ref.close();
  }

  submit(name: string, contact: string) {
    if (this.customer === undefined) {
      this.customer = new Customer();
    }
    this.customer.name = name;
    this.customer.contact = contact;
    console.log(this.customer);
    this.maintenanceService.addUpdateCustomer(this.customer).subscribe(
      response => {
        this.ref.close();
      },
      error => {
        this.showToast(
          "danger",
          "Error!",
          "An error occured while creating customer!"
        );
        console.log(error);
        this.ref.close();
      }
    );
  }
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates
    };
    const titleContent = title ? `${title}` : "";
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
