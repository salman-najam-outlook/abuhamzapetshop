import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { MaintenanceService } from "../../../services/maintenance.service";
import { Salary } from "../../../models/salary.model";

@Component({
  selector: "ngx-smart-table",
  templateUrl: "./salaries.component.html",
  styleUrls: ["./salaries.component.scss"]
})
export class SalariesComponent implements OnInit {
  salary: Salary = new Salary();
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
        console.log(error);
      }
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
      this.maintenanceService.deleteSalary(event.data.sal_id).subscribe(
        response => {
          this.maintenanceService.getAllSalaries().subscribe(
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
    this.salary.sal_id = 0;
    this.salary.amount = event.newData.amount;
    this.salary.date = event.newData.date;
    this.salary.emp_id = event.newData.emp_id;
    this.maintenanceService.addUpdateSalary(this.salary).subscribe(response => {
      this.maintenanceService.getAllSalaries().subscribe(
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
    this.salary.sal_id = event.newData.sal_id;
    this.salary.amount = event.newData.amount;
    this.salary.date = event.newData.date;
    this.salary.emp_id = event.newData.emp_id;
    this.maintenanceService.addUpdateSalary(this.salary).subscribe(response => {
      this.maintenanceService.getAllSalaries().subscribe(
        response => {
          this.source.load(response);
        },
        error => {
          console.log(error);
        }
      );
    });
  }
}
