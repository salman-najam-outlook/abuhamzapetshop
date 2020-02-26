import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { MaintenanceService } from "../../../services/maintenance.service";
import { Supplier } from "../../../models/supplier.model";
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
  selector: "ngx-suppliers",
  templateUrl: "./suppliers.component.html",
  styleUrls: ["./suppliers.component.scss"]
})
export class SuppliersComponent implements OnInit {
  supplier: Supplier = new Supplier();
  source: LocalDataSource = new LocalDataSource();

  // Toaster Setting Starts
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  // Toaster Setting Ends

  constructor(private maintenanceService: MaintenanceService, private toastrService: NbToastrService) { }

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
      company: {
        title: "Company Name",
        type: "string"
      },
      date: {
        title: "Date",
        type: "date"
      },
      contact: {
        title: "Contact",
        type: "number"
      }
    }
  };

  ngOnInit() {
    this.maintenanceService.getAllSuppliers().subscribe(
      response => {
        this.source.load(response);
      },
      error => {
        this.showToast('danger', 'Error!', 'An error occured while fetching all Suppliers.');
      }
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
      this.maintenanceService.deleteSupplier(event.data.sup_id).subscribe(
        response => {
          this.showToast('success', 'Success!', 'Targeted Supplier has been deleted succesfully.');
          this.maintenanceService.getAllSuppliers().subscribe(
            response => {
              this.source.load(response);
            },
            error => {
              this.showToast('danger', 'Error!', 'An error occured while fetching all Suppliers.');
            }
          );
        },
        error => {
          this.showToast('danger', 'Error!', 'Unable to delete the targeted Supplier.');
        }
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    event.confirm.resolve();
    this.supplier.sup_id = 0;
    this.supplier.name = event.newData.name;
    this.supplier.company = event.newData.company;
    this.supplier.date = event.newData.date;
    this.supplier.contact = event.newData.contact;
    this.maintenanceService
      .addUpdateSupplier(this.supplier)
      .subscribe(
        response => {
          this.showToast('success', 'Success!', 'New Supplier has been added successfully.');
          this.maintenanceService.getAllSuppliers().subscribe(
            response => {
              this.source.load(response);
            },
            error => {
              this.showToast('danger', 'Error!', 'An error occured while fetching all Suppliers.');
            }
          );
        },
        error => {
          this.showToast('danger', 'Error!', 'An error occured while adding new Suppliers');
        });
  }

  onConfirmEdit(event): void {
    event.confirm.resolve();
    this.supplier.sup_id = event.newData.sup_id;
    this.supplier.name = event.newData.name;
    this.supplier.company = event.newData.company;
    this.supplier.date = event.newData.date;
    this.supplier.contact = event.newData.contact;
    this.maintenanceService
      .addUpdateSupplier(this.supplier)
      .subscribe(
        response => {
          this.showToast('success', 'Success!', 'Supplier has been updated successfully.');
          this.maintenanceService.getAllSuppliers().subscribe(
            response => {
              this.source.load(response);
            },
            error => {
              this.showToast('danger', 'Error!', 'An error occured while fetching all Suppliers.');
            }
          );
        },
        error => {
          this.showToast('danger', 'Error!', 'An error occured while updating targeted Supplier.');
        });
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
