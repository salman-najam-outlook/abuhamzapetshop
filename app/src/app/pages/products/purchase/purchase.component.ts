import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SingleProduct } from '../../../models/singleProduct.model';
import { PurchaseOrder } from '../../../models/purchaseOrder.model';
import { ProductService } from '../../../services/product.service';
import { MaintenanceService } from '../../../services/maintenance.service';
import { Supplier } from '../../../models/supplier.model';
import { NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbToastrService } from '@nebular/theme';

@Component({
    selector: 'ngx-purchase',
    styleUrls: ['./purchase.component.scss'],
    templateUrl: './purchase.component.html',
})

export class PurchaseComponent implements OnInit {
    source: LocalDataSource = new LocalDataSource();
    single: SingleProduct[] = [];
    singleProduct: SingleProduct;
    purchaseProductForm: FormGroup;
    purchaseOrder: PurchaseOrder;
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
            add: false
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
            barcode: {
                title: 'Barcode',
                type: 'string',
                editable: false,
            },
            productName: {
                title: 'Name',
                type: 'string',
                editable: false,
            },
            purchasePrice: {
                title: 'Purchase Price',
                type: 'number',
            },
            quantity: {
                title: 'Quantity',
                stype: 'number'
            }
        },
    };

    constructor(private productService: ProductService, private maintenanceService: MaintenanceService,
        private toastrService: NbToastrService) { }

    ngOnInit() {
        this.purchaseProductForm = new FormGroup({
            barcode: new FormControl('', Validators.required),
            productName: new FormControl('', Validators.required),
            description: new FormControl(''),
            purchasePrice: new FormControl('', Validators.required),
            quantity: new FormControl('', Validators.required),
            totalAmount: new FormControl(''),
            paidAmount: new FormControl(''),
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

    onDeleteConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            event.confirm.resolve();
            this.showToast('success', 'Success!', 'Targeted record has been deleted successfully.');
            this.single = this.single.filter(single => single.barcode !== event.data.barcode);
            this.source.load(this.single);
            if(this.single.length <= 0) {
            this.purchaseProductForm.controls.totalAmount.setValue(0);
            } else {
                var total = this.single.map(this.amount).reduce(this.sum);
                this.purchaseProductForm.controls.totalAmount.setValue(total);
            }
             
        } else {
            event.confirm.reject();
        }
    }

    onAdd() {
        this.singleProduct = new SingleProduct();
        this.singleProduct.barcode = this.purchaseProductForm.controls.barcode.value;
        this.singleProduct.productName = this.purchaseProductForm.controls.productName.value;
        this.singleProduct.purchasePrice = this.purchaseProductForm.controls.purchasePrice.value;
        this.singleProduct.quantity = this.purchaseProductForm.controls.quantity.value;
        this.single.push(this.singleProduct);
        this.purchaseProductForm.reset();
        this.purchaseProductForm.controls.supplier.setValue(this.selectedSupplier);
        var total = this.single.map(this.amount).reduce(this.sum);
        this.purchaseProductForm.controls.totalAmount.setValue(total);
        this.source.load(this.single);
    }

    onClear() {
        this.purchaseProductForm.reset();
        this.purchaseProductForm.controls.supplier.setValue(this.selectedSupplier);
        var total = this.single.map(this.amount).reduce(this.sum);
        this.purchaseProductForm.controls.totalAmount.setValue(total);
        this.source.load(this.single);
    }

    // Methods to calculate total amount along with quantity starts
    amount(item) {
        return item.purchasePrice * item.quantity;
    }

    sum(prev, next) {
        return prev + next;
    }
    // Methods to calculate total amount along with quantity ends

    onConfirmEdit(event): void {
        event.confirm.resolve();
        this.showUpdatedItem(event);
        var total = this.single.map(this.amount).reduce(this.sum);
        this.purchaseProductForm.controls.totalAmount.setValue(total);
        this.source.load(this.single);
    }

    // Methods to find old object and replace it with your object starts
    showUpdatedItem(newItem) {
        let updateItem = this.single.find(this.findIndexToUpdate, newItem.newData.barcode);
        let index = this.single.indexOf(updateItem);
        this.single[index] = newItem.newData;
    }

    findIndexToUpdate(newItem) {
        return newItem.barcode === this;
    }
    // Methods to find old object and replace it with your object ends

    onSupplierSelect(event) {
        this.selectedSupplier = event;
        this.purchaseProductForm.controls.supplier.setValue(event);
    }

    onSubmit() {
        this.purchaseOrder = new PurchaseOrder();
        this.purchaseOrder.paidAmount = this.purchaseProductForm.controls.paidAmount.value;
        this.purchaseOrder.totalAmount = this.purchaseProductForm.controls.totalAmount.value;
        this.purchaseOrder.description = this.purchaseProductForm.controls.description.value;
        this.purchaseOrder.supplier = this.purchaseProductForm.controls.supplier.value;
        this.purchaseOrder.orderDetails = this.single;
        this.productService.addPurchaseOrder(this.purchaseOrder).subscribe(
            response => {
                this.purchaseProductForm.reset();
                this.showToast('success', 'Success!', 'Purchase has been entered into system successfully.');
            },
            error => {
                this.showToast('danger', 'Error!', 'An error occured while entering Purchase.');
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
          preventDuplicates: this.preventDuplicates,
        };
        const titleContent = title ? `${title}` : '';
        this.toastrService.show(body,`${titleContent}`, config);
      }
}

