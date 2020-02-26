import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MaintenanceService } from '../../../services/maintenance.service';
import { Supplier } from '../../../models/supplier.model';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';

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
            supplier: {
                title: 'Supplier Name',
                type: 'string',
            },
            voucherNumber: {
                title: 'Voucher Number',
                type: 'string',
            },
            remainingAmount: {
                title: 'Remaining Amount',
                type: 'string',
            },
            amountToBePaid: {
                title: 'Amount To Be Paid',
                type: 'number',
            }
        },
    };

    constructor(private productService: ProductService, private maintenanceService: MaintenanceService,
        private toastrService: NbToastrService) { }

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
    }

    onSubmit() {
        console.log('submitted');
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

