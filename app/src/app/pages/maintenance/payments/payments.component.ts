import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MaintenanceService } from '../../../services/maintenance.service';
import { Supplier } from '../../../models/supplier.model';
import {
  NbGlobalPosition,
  NbGlobalPhysicalPosition,
  NbComponentStatus,
  NbToastrService,
} from '@nebular/theme';
import { Payment } from '../../../models/payment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-payments',
  styleUrls: ['./payments.component.scss'],
  templateUrl: './payments.component.html',
})
export class PaymentsComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  paymentForm: FormGroup;
  suppliers: Supplier[];
  selectedSupplier: number;
  selectedVrType: number;
  paymentModel: Payment;

  // Toaster Setting Starts
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  // Toaster Setting Ends

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      SupplierName: {
        title: 'Name',
        type: 'string',
      },
      vchNo: {
        title: 'Voucher Number',
        type: 'string',
      },
      totalAmount: {
        title: 'Total Amount',
        type: 'number',
      },
      pendingAmount: {
        title: 'Amount To Be Paid',
        type: 'number',
      },
      paidAmount: {
        title: 'Paid Amount',
        type: 'number',
      },
    },
  };

  constructor(
    private maintenanceService: MaintenanceService,
    private toastrService: NbToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.paymentForm = new FormGroup({
      voucherNumber: new FormControl('', Validators.required),
      remainingAmount: new FormControl('', Validators.required),
      amountToBePaid: new FormControl('', Validators.required),
      supplier: new FormControl(''),
      voucher: new FormControl(''),
    });
    this.maintenanceService.getAllSuppliers().subscribe(
      response => {
        this.suppliers = response;
      },
      error => {
        if (error.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('expires');
          localStorage.removeItem('user');
          this.router.navigate(['auth'], {
            queryParams: {
              isSessionExpired: true,
            },
          });
        } else {
          this.showToast(
            'danger',
            'Error!',
            'An error occured while fetching Suppliers.',
          );
        }
      },
    );
  }

  onClear() {
    this.paymentForm.reset();
  }

  onSupplierSelect(event) {
    this.selectedSupplier = event;
    this.paymentForm.controls.supplier.setValue(event);
    this.maintenanceService.getPendingVouchersBySupplierID(event).subscribe(
      response => {
        this.source.load(response);
      },
      error => {
        if (error.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('expires');
          localStorage.removeItem('user');
          this.router.navigate(['auth'], {
            queryParams: {
              isSessionExpired: true,
            },
          });
        } else {
          this.showToast(
            'danger',
            'Error!',
            'An error occured while fetching pending vouchers!',
          );
        }
      },
    );
  }

  onVoucherSelect(event) {
    this.selectedVrType = +event;
    if (this.selectedVrType === 1) {
      this.maintenanceService.getAllPendingVouchers().subscribe(
        response => {
          this.source.load(response);
        },
        error => {
          if (error.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('expires');
            localStorage.removeItem('user');
            this.router.navigate(['auth'], {
              queryParams: {
                isSessionExpired: true,
              },
            });
          } else {
            this.showToast(
              'danger',
              'Error!',
              'An error occured while fetching pending vouchers!',
            );
          }
        },
      );
    } else if (this.selectedVrType === 2) {
      this.maintenanceService.getPendingVouchersOfSale().subscribe(
        response => {
          this.source.load(response);
        },
        error => {
          if (error.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('expires');
            localStorage.removeItem('user');
            this.router.navigate(['auth'], {
              queryParams: {
                isSessionExpired: true,
              },
            });
          } else {
            this.showToast(
              'danger',
              'Error!',
              'An error occured while fetching pending vouchers!',
            );
          }
        },
      );
    } else if (this.selectedVrType === 3) {
      this.maintenanceService.getPendingVouchersOfAdvance().subscribe(
        response => {
          this.source.load(response);
        },
        error => {
          if (error.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('expires');
            localStorage.removeItem('user');
            this.router.navigate(['auth'], {
              queryParams: {
                isSessionExpired: true,
              },
            });
          } else {
            this.showToast(
              'danger',
              'Error!',
              'An error occured while fetching pending vouchers!',
            );
          }
        },
      );
    }
  }

  onSubmit() {
    this.paymentModel = new Payment();
    this.paymentModel.supplierId = this.paymentForm.controls.supplier.value;
    this.paymentModel.voucherNumber = this.paymentForm.controls.voucherNumber.value;
    this.paymentModel.amountPaid = this.paymentForm.controls.amountToBePaid.value;
    this.maintenanceService.paymentAgainstSupplier(this.paymentModel).subscribe(
      response => {
        this.paymentForm.reset();
        this.showToast(
          'success',
          'Success!',
          'Payment has been updated against selected supplier !',
        );
        this.maintenanceService
          .getPendingVouchersBySupplierID(this.selectedSupplier)
          .subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            response => {
              this.source.load(response);
            },
            error => {
              if (error.status === 401) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('expires');
                localStorage.removeItem('user');
                this.router.navigate(['auth'], {
                  queryParams: {
                    isSessionExpired: true,
                  },
                });
              } else {
                this.showToast(
                  'danger',
                  'Error!',
                  'An error occured while fetching pending vouchers!',
                );
              }
            },
          );
      },
      error => {
        if (error.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('expires');
          localStorage.removeItem('user');
          this.router.navigate(['auth'], {
            queryParams: {
              isSessionExpired: true,
            },
          });
        } else {
          this.showToast(
            'danger',
            'Error!',
            'An error occured while updating payment against select supplier!',
          );
        }
      },
    );
  }

  onRowSelect(event) {
    this.paymentForm.controls.voucherNumber.setValue(event.data.vchNo);
    this.paymentForm.controls.remainingAmount.setValue(
      event.data.pendingAmount,
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
