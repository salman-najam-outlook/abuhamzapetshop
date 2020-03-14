import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { MaintenanceService } from '../../../services/maintenance.service';
import { Customer } from '../../../models/customer.model';
import {
  NbGlobalPosition,
  NbGlobalPhysicalPosition,
  NbComponentStatus,
  NbToastrService,
} from '@nebular/theme';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
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
    private datePipe: DatePipe,
  ) {}

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      date: {
        title: 'Date',
        type: 'date',
        editable: false,
        addable: false,
        valuePrepareFunction: (date) => {
          return this.datePipe.transform(new Date(date), 'dd MMM yyyy');
        },
      },
      contact: {
        title: 'Contact',
        type: 'number',
      },
    },
  };

  ngOnInit() {
    this.getAllCustomers();
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.maintenanceService.deleteCustomer(event.data.cus_id).subscribe(
        response => {
          this.showToast(
            'success',
            'Success!',
            'Targeted Customer has been deleted succesfully.',
          );
          this.maintenanceService.getAllCustomers().subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            response => {
              this.source.load(response);
            },
            error => {
              this.showToast(
                'danger',
                'Error!',
                'An error occured while fetching all Customers.',
              );
            },
          );
        },
        error => {
          this.showToast(
            'danger',
            'Error!',
            'Unable to delete the targeted Customer.',
          );
        },
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    event.confirm.resolve();
    this.customer.cus_id = 0;
    this.customer.name = event.newData.name;
    this.customer.date = event.newData.date;
    this.customer.contact = event.newData.contact;
    this.maintenanceService.addUpdateCustomer(this.customer).subscribe(
      response => {
        this.showToast(
          'success',
          'Success!',
          'New Customer has been added successfully.',
        );
        this.maintenanceService.getAllCustomers().subscribe(
          // tslint:disable-next-line: no-shadowed-variable
          response => {
            this.source.load(response);
          },
          error => {
            this.showToast(
              'danger',
              'Error!',
              'An error occured while fetching all Customers.',
            );
          },
        );
      },
      error => {
        this.showToast(
          'danger',
          'Error!',
          'An error occured while adding new Customers',
        );
      },
    );
  }

  onConfirmEdit(event): void {
    event.confirm.resolve();
    this.customer.cus_id = event.newData.cus_id;
    this.customer.name = event.newData.name;
    this.customer.date = event.newData.date;
    this.customer.contact = event.newData.contact;
    this.maintenanceService.addUpdateCustomer(this.customer).subscribe(
      response => {
        this.showToast(
          'success',
          'Success!',
          'Customer has been updated successfully.',
        );
        this.maintenanceService.getAllCustomers().subscribe(
          // tslint:disable-next-line: no-shadowed-variable
          response => {
            this.source.load(response);
          },
          error => {
            this.showToast(
              'danger',
              'Error!',
              'An error occured while fetching all Customers.',
            );
          },
        );
      },
      error => {
        this.showToast(
          'danger',
          'Error!',
          'An error occured while updating targeted Customer.',
        );
      },
    );
  }

  onCustomerTypeSelected(event: number) {
    const customerTypeNumber = +event;
    if (customerTypeNumber === 0) {
      this.getAllCustomers();
    } else {
      this.maintenanceService.getCustomersByType(customerTypeNumber).subscribe(
        (response) => {
          this.source.load(response);
        },
        (error) => {
          this.showToast(
            'danger',
            'Error!',
            'An error occured while fetching Customers.',
          );
        },
      )
    }
  }

  private getAllCustomers() {
    this.maintenanceService.getAllCustomers().subscribe(
      response => {
        this.source.load(response);
      },
      error => {
        this.showToast(
          'danger',
          'Error!',
          'An error occured while fetching all Customers.',
        );
      },
    );
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
