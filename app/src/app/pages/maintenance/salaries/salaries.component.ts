import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { MaintenanceService } from "../../../services/maintenance.service";
import { Salary } from "../../../models/salary.model";
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPosition,
  NbGlobalPhysicalPosition
} from "@nebular/theme";

@Component({
  selector: "ngx-smart-table",
  templateUrl: "./salaries.component.html",
  styleUrls: ["./salaries.component.scss"]
})
export class SalariesComponent implements OnInit {
  salary: Salary = new Salary();
  constructor(
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
      sal_id: {
        title: "ID",
        type: "number"
      },
      date: {
        title: "Date",
        type: "date"
      },
      amount: {
        title: "Amount",
        type: "number"
      },
      emp_id: {
        title: "Emp Id",
        type: "number"
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  ngOnInit() {
    this.maintenanceService.getAllSalaries().subscribe(
      response => {
        this.source.load(response);
      },
      error => {
        this.showToast(
          "danger",
          "Error!",
          "An error occured while fetching all Employee salaries!"
        );
      }
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
      this.maintenanceService.deleteSalary(event.data.sal_id).subscribe(
        response => {
          this.showToast(
            "success",
            "Success!",
            "Targeted Employee salary has been deleted successfully!"
          );
          this.maintenanceService.getAllSalaries().subscribe(
            response => {
              this.source.load(response);
            },
            error => {
              this.showToast(
                "danger",
                "Error!",
                "An error occured while fetching all Employee salaries!"
              );
            }
          );
        },
        error => {
          this.showToast(
            "danger",
            "Error!",
            "An error occured while deleting Employee salary"
          );
        }
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    event.confirm.resolve();
    this.salary.sal_id = 0;
    this.salary.amount = event.newData.amount;
    this.salary.date = event.newData.date;
    this.salary.emp_id = event.newData.emp_id;
    this.maintenanceService.addUpdateSalary(this.salary).subscribe(
      response => {
        this.showToast(
          "success",
          "Success!",
          "New Employee salary has been added successfully!"
        );
        this.maintenanceService.getAllSalaries().subscribe(
          response => {
            this.source.load(response);
          },
          error => {
            this.showToast(
              "danger",
              "Error!",
              "An error occured while fetching all Employee salaries!"
            );
          }
        );
      },
      error => {
        this.showToast(
          "danger",
          "Error!",
          "An error occured while creating salary!"
        );
      }
    );
  }

  onConfirmEdit(event): void {
    event.confirm.resolve();
    this.salary.sal_id = event.newData.sal_id;
    this.salary.amount = event.newData.amount;
    this.salary.date = event.newData.date;
    this.salary.emp_id = event.newData.emp_id;
    this.maintenanceService.addUpdateSalary(this.salary).subscribe(response => {
      this.maintenanceService.getAllSalaries().subscribe(
        response => {
          this.showToast(
            "success",
            "Success!",
            "Employee salary has been updated successfully!"
          );
          this.source.load(response);
        },
        error => {
          this.showToast(
            "danger",
            "Error!",
            "An error occured while updating Employee salary!"
          );
        }
      );
    });
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
