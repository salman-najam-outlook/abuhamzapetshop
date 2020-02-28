import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MaintenanceService } from '../../../services/maintenance.service';
import { Supplier } from '../../../models/supplier.model';

import { Payment } from '../../../models/payment.model';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbToastrService, NbComponentStatus } from '@nebular/theme';

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
            delete: false
        },
        columns: {
            SupplierName: {
                title: 'Supplier Name',
                type: 'string',
            },
            vchNo: {
                title: 'Voucher Number',
                type: 'string',
            },
            totalAmount: {
                title: 'Remaining Amount',
                type: 'number',
            },
            pendingAmount: {
                title: 'Amount To Be Paid',
                type: 'number',
            },
            paidAmount: {
                title: 'Paid Amount',
                type: 'number',
            }
        },
    };

    constructor(private productService: ProductService, private maintenanceService: MaintenanceService,
        private toastrService: NbToastrService) { 
            
        }

    ngOnInit() {
        this.paymentForm = new FormGroup({
            voucherNumber: new FormControl('', Validators.required),
            remainingAmount: new FormControl('', Validators.required),
            amountToBePaid: new FormControl(''),
            supplier: new FormControl('', Validators.required)
        });
        this.maintenanceService.getAllSuppliers().subscribe(
            response => {
                this.suppliers = response;
            },
            error => {
                this.showToast('danger', 'Error!', 'An error occured while fetching Suppliers.');
            }
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
                console.log(error);
            }
        );
    }

    onSubmit() {
        this.paymentModel = new Payment();
        this.paymentModel.supplierId = this.paymentForm.controls.supplier.value;
        this.paymentModel.voucherNumber = this.paymentForm.controls.voucherNumber.value;
        this.paymentModel.amountPaid = this.paymentForm.controls.amountToBePaid.value;
        this.maintenanceService.paymentAgainstSupplier(this.paymentModel).subscribe(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
            }
        );
    }

    onRowSelect(event) {
        this.paymentForm.controls.voucherNumber.setValue(event.data.vchNo);
        this.paymentForm.controls.remainingAmount.setValue(event.data.pendingAmount);
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
        this.toastrService.show(body,`${titleContent}`, config);
      }
}

