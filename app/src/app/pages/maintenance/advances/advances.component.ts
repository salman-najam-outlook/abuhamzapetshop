import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { MaintenanceService } from "../../../services/maintenance.service";
import { Advance } from "../../../models/advance.model";
import {
  NbGlobalPosition,
  NbGlobalPhysicalPosition,
  NbComponentStatus,
  NbToastrService
} from "@nebular/theme";
import { Customer } from "../../../models/customer.model";
import { DatePipe } from '@angular/common';

@Component({
  selector: "ngx-advances",
  templateUrl: "./advances.component.html",
  styleUrls: ["./advances.component.scss"]
})
export class AdvancesComponent implements OnInit {
  advance: Advance = new Advance();
  customer: Customer = new Customer();
  source: LocalDataSource = new LocalDataSource();

  // Toaster Setting Starts
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  // Toaster Setting Ends

  constructor(
    private maintenanceService: MaintenanceService,
    private toastrService: NbToastrService,
    private datePipe: DatePipe
  ) {}

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    columns: {
      cus_Name: {
        title: "Customer Name",
        type: "string"
      },
      barcode: {
        title: "Product Barcode",
        type: "string"
      },
      amount: {
        title: "Amount",
        type: "number"
      },
      cus_No: {
        title: "Contact",
        type: "number"
      },
      date: {
        title: "Date",
        type: "date",
        valuePrepareFunction: (date) => {
          return this.datePipe.transform(new Date(date), 'dd MMM yyyy');
        }
      },
      description: {
        title: "Description",
        type: "string"
      }
    }
  };

  ngOnInit() {
    this.maintenanceService.getAllAdvances().subscribe(
      response => {
        console.log(response);
        this.source.load(response);
      },
      error => {
        this.showToast(
          "danger",
          "Error!",
          "An error occured while fetching all Advances."
        );
      }
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
      this.maintenanceService.deleteAdvance(event.data.advance_id).subscribe(
        response => {
          this.showToast(
            "success",
            "Success!",
            "Targeted Advance has been deleted succesfully."
          );
          this.maintenanceService.getAllAdvances().subscribe(
            response => {
              this.source.load(response);
            },
            error => {
              this.showToast(
                "danger",
                "Error!",
                "An error occured while fetching all Advances."
              );
            }
          );
        },
        error => {
          this.showToast(
            "danger",
            "Error!",
            "Unable to delete the targeted Advance."
          );
        }
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    event.confirm.resolve();
    this.advance.advance_id = 0;
    this.advance.cus_id = 0;
    this.advance.date = event.newData.date;
    this.advance.cus_No = event.newData.cus_No;
    this.advance.description = event.newData.description;
    this.advance.barcode = event.newData.barcode;
    this.advance.cus_Name = event.newData.cus_Name;
    this.advance.amount = +event.newData.amount;
    console.log(this.advance);
    this.maintenanceService.addUpdateAdvance(this.advance).subscribe(
      response => {
        this.showToast(
          "success",
          "Success!",
          "New Advance has been added successfully."
        );
        this.maintenanceService.getAllAdvances().subscribe(
          response => {
            this.source.load(response);
          },
          error => {
            this.showToast(
              "danger",
              "Error!",
              "An error occured while fetching all Advances."
            );
          }
        );
      },
      error => {
        this.showToast(
          "danger",
          "Error!",
          "An error occured while adding new Advances"
        );
      }
    );

    // this.maintenanceService.addUpdateCustomer(this.customer).subscribe(
    //   response => {

    //   },
    //   error => {
    //     this.showToast(
    //       "danger",
    //       "Error!",
    //       "An error occured while creating Customer."
    //     );
    //   }
    // );
  }

  onConfirmEdit(event): void {
    event.confirm.resolve();
    this.advance.cus_id = 0;
    this.advance.date = event.newData.date;
    this.advance.cus_No = event.newData.contact;
    this.advance.description = event.newData.description;
    this.maintenanceService.addUpdateAdvance(this.advance).subscribe(
      response => {
        this.showToast(
          "success",
          "Success!",
          "Advance has been updated successfully."
        );
        this.maintenanceService.getAllAdvances().subscribe(
          response => {
            this.source.load(response);
          },
          error => {
            this.showToast(
              "danger",
              "Error!",
              "An error occured while fetching all Advances."
            );
          }
        );
      },
      error => {
        this.showToast(
          "danger",
          "Error!",
          "An error occured while updating targeted Advance."
        );
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
