import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { MaintenanceService } from "../../../services/maintenance.service";
import { Employee } from "../../../models/employee.model";

@Component({
  selector: "ngx-smart-table",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.scss"]
})
export class EmployeesComponent implements OnInit {
  employee: Employee = new Employee();
  constructor(private maintenanceService: MaintenanceService) {}

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
        width: '25%'
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
        console.log(error);
      }
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
      this.maintenanceService.deleteEmployee(event.data.emp_id).subscribe(
        response => {
          this.maintenanceService.getAllEmployees().subscribe(
            response => {
              this.source.load(response);
            },
            error => {
              console.log(error);
            }
          );
        },
        error => {
          console.log(error);
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
    this.maintenanceService
      .addUpdateEmployee(this.employee)
      .subscribe(response => {
        this.maintenanceService.getAllEmployees().subscribe(
          response => {
            this.source.load(response);
          },
          error => {
            console.log(error);
          }
        );
      });
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
    this.maintenanceService
      .addUpdateEmployee(this.employee)
      .subscribe(
        response => {
        this.maintenanceService.getAllEmployees().subscribe(
          response => {
            this.source.load(response);
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        // alert
      });
  }
}
