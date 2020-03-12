import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { User } from "../../../models/user.model";
import { MaintenanceService } from "../../../services/maintenance.service";
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPosition,
  NbGlobalPhysicalPosition
} from "@nebular/theme";

@Component({
  selector: "ngx-smart-table",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  user: User = new User();
  source: LocalDataSource = new LocalDataSource();

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
      firstname: {
        title: "First Name *",
        type: "string"
      },
      lastname: {
        title: "Last Name",
        type: "string"
      },
      username: {
        title: "Username",
        type: "string"
      },
      email: {
        title: "E-mail",
        type: "string"
      },
      contact: {
        title: "Contact",
        type: "number"
      }
    }
  };

  constructor(
    private maintenanceService: MaintenanceService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.maintenanceService.getAllUsers().subscribe(
      response => {
        this.source.load(response);
      },
      error => {
        this.showToast(
          "danger",
          "Error!",
          "An error occured while fetching all Users!"
        );
      }
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
      this.maintenanceService.deleteUser(event.data.user_id).subscribe(
        response => {
          this.showToast(
            "success",
            "Success!",
            "Targeted User has been deleted successfully!"
          );
          this.maintenanceService.getAllUsers().subscribe(
            response => {
              this.source.load(response);
            },
            error => {
              this.showToast(
                "danger",
                "Error!",
                "An error occured while fetching all Users!"
              );
            }
          );
        },
        error => {
          this.showToast(
            "danger",
            "Error!",
            "An error occured while deleting User!"
          );
        }
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    event.confirm.resolve();
    this.user.user_id = 0;
    if (event.newData.firstname == "" || event.newData.lastname == "") {
      this.showToast(
        "danger",
        "Error!",
        "Please fill up all the required fields!"
      );
      return;
    }
    this.user.firstname = event.newData.firstname;
    this.user.lastname = event.newData.lastname;
    this.user.username = event.newData.username;
    this.user.email = event.newData.email;
    this.user.contact = event.newData.contact;
    this.user.status = "active";
    this.user.userRoll = "emp";
    this.user.password = "pass123";
    this.maintenanceService.addUpdateUser(this.user).subscribe(
      response => {
        this.showToast(
          "success",
          "Success!",
          "New User has been added successfully!"
        );
        this.maintenanceService.getAllUsers().subscribe(
          response => {
            this.source.load(response);
          },
          error => {
            this.showToast(
              "danger",
              "Error!",
              "An error occured while fetching User!"
            );
          }
        );
      },
      error => {
        this.showToast(
          "danger",
          "Error!",
          "An error occured while adding a new User!"
        );
      }
    );
  }

  onConfirmEdit(event): void {
    event.confirm.resolve();
    this.user.user_id = event.newData.user_id;
    this.user.firstname = event.newData.firstname;
    this.user.lastname = event.newData.lastname;
    this.user.username = event.newData.username;
    this.user.email = event.newData.email;
    this.user.contact = event.newData.contact;
    this.user.status = "active";
    this.user.userRoll = "emp";
    this.user.password = "pass123";
    this.maintenanceService.addUpdateUser(this.user).subscribe(response => {
      this.showToast(
        "success",
        "Success!",
        "User has been updated successfully!"
      );
      this.maintenanceService.getAllUsers().subscribe(
        response => {
          this.source.load(response);
          this.showToast(
            "danger",
            "Error!",
            "An error occured while fetching all Users!"
          );
        },
        error => {
          this.showToast(
            "danger",
            "Error!",
            "An error occured while updating User!"
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
