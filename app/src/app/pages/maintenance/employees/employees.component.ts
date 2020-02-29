import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { MaintenanceService } from "../../../services/maintenance.service";
import { Employee } from "../../../models/employee.model";
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPosition,
  NbGlobalPhysicalPosition
} from "@nebular/theme";

@Component({
  selector: "ngx-smart-table",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.scss"]
})
export class EmployeesComponent implements OnInit {
  employee: Employee = new Employee();
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
      name: {
        title: "Name",
        type: "string"
      },
      NIC: {
        title: "NIC",
        type: "string"
      },
      address: {
        title: "Address",
        type: "string",
        width: "25%"
      },
      salary: {
        title: "Salary",
        type: "number"
      },
      contact: {
        title: "Contact",
        type: "number"
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  ngOnInit() {
    this.maintenanceService.getAllEmployees().subscribe(
      response => {
        this.source.load(response);
      },
      error => {
        this.showToast(
          "danger",
          "Error!",
          "An error occured while fetching all Employees!"
        );
      }
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
      this.maintenanceService.deleteEmployee(event.data.emp_id).subscribe(
        response => {
          this.showToast(
            "success",
            "Success!",
            "Targeted Employee has been deleted successfully!"
          );
          this.maintenanceService.getAllEmployees().subscribe(
            response => {
              this.source.load(response);
            },
            error => {
              this.showToast(
                "danger",
                "Error!",
                "An error occured while fetching all Employess!"
              );
            }
          );
        },
        error => {
          this.showToast(
            "danger",
            "Error!",
            "An error occured while deleting Employee!"
          );
        }
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    event.confirm.resolve();
    this.employee.emp_id = 0;
    this.employee.name = event.newData.name;
    this.employee.NIC = event.newData.NIC;
    this.employee.address = event.newData.address;
    this.employee.salary = event.newData.salary;
    this.employee.date = event.newData.date;
    this.employee.contact = event.newData.contact;
    console.log(event.newData);
    console.log(this.employee);
    this.maintenanceService.addUpdateEmployee(this.employee).subscribe(
      response => {
        this.showToast(
          "success",
          "Success!",
          "New Employee has been added successfully!"
        );
        this.maintenanceService.getAllEmployees().subscribe(
          response => {
            this.source.load(response);
          },
          error => {
            this.showToast(
              "danger",
              "Error!",
              "An error occured while fetching all Employees!"
            );
          }
        );
      },
      error => {
        this.showToast(
          "danger",
          "Error!",
          "An error occured while creating Employee!"
        );
      }
    );
  }

  onConfirmEdit(event): void {
    event.confirm.resolve();
    this.employee.emp_id = event.newData.emp_id;
    this.employee.name = event.newData.name;
    this.employee.NIC = event.newData.NIC;
    this.employee.address = event.newData.address;
    this.employee.salary = event.newData.salary;
    this.employee.date = event.newData.date;
    this.employee.contact = event.newData.contact;
    console.log(event.newData);
    console.log(this.employee);
    this.maintenanceService.addUpdateEmployee(this.employee).subscribe(
      response => {
        this.showToast(
          "success",
          "Success!",
          "Employee has been updated successfully!"
        );
        this.maintenanceService.getAllEmployees().subscribe(
          response => {
            this.source.load(response);
          },
          error => {
            this.showToast(
              "danger",
              "Error!",
              "An error occured while fetching all Employees!"
            );
          }
        );
      },
      error => {
        this.showToast(
          "danger",
          "Error!",
          "An error occured while updating Employee!"
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
