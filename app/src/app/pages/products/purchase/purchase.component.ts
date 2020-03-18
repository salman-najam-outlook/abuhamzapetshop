import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SingleProduct } from '../../../models/singleProduct.model';
import { PurchaseOrder } from '../../../models/purchaseOrder.model';
import { ProductService } from '../../../services/product.service';
import { MaintenanceService } from '../../../services/maintenance.service';
import { Supplier } from '../../../models/supplier.model';
import { Account } from '../../../models/account.model';
import {
  NbGlobalPosition,
  NbGlobalPhysicalPosition,
  NbComponentStatus,
  NbToastrService,
} from '@nebular/theme';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-purchase',
  styleUrls: ['./purchase.component.scss'],
  templateUrl: './purchase.component.html',
})
export class PurchaseComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  single: SingleProduct[] = [];
  emptyGrid: SingleProduct[] = [];
  singleProduct: SingleProduct;
  purchaseProductForm: FormGroup;
  purchaseOrder: PurchaseOrder;
  suppliers: Supplier[];
  selectedSupplier: number;
  fromAccounts: Account[];
  user: User;

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
        stype: 'number',
      },
    },
  };

  constructor(
    private productService: ProductService,
    private maintenanceService: MaintenanceService,
    private toastrService: NbToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.purchaseProductForm = new FormGroup({
      barcode: new FormControl('', Validators.required),
      pro_id: new FormControl(''),
      productName: new FormControl('', Validators.required),
      description: new FormControl(''),
      purchasePrice: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      totalAmount: new FormControl(''),
      totalCost: new FormControl(''),
      paidAmount: new FormControl(''),
      fromAccount: new FormControl(''),
      supplier: new FormControl('', Validators.required),

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
    this.maintenanceService.GetFromAccounts().subscribe(
      response => {
        this.fromAccounts = response;
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
          'An error occured while fetching FromAccounts.',
        );
        }
      },
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.single = this.single.filter(
        single => single.sellerId !== event.data.sellerId && single.barcode !== event.data.barcode,
      );
      this.source.load(this.single);
      if (this.single.length <= 0) {
        this.purchaseProductForm.controls.totalAmount.setValue(0);
      } else {
        const total = this.single.map(this.amount).reduce(this.sum);
        this.purchaseProductForm.controls.totalAmount.setValue(total);
      }
      this.showToast(
        'success',
        'Success!',
        'Targeted record has been deleted successfully.',
      );
    } else {
      event.confirm.reject();
    }
  }

  onAdd() {
    this.singleProduct = new SingleProduct();
    this.selectedSupplier = 0;
    this.singleProduct.pro_id = this.purchaseProductForm.controls.pro_id.value;
    this.singleProduct.barcode = this.purchaseProductForm.controls.barcode.value;
    this.singleProduct.productName = this.purchaseProductForm.controls.productName.value;
    this.singleProduct.purchasePrice = this.purchaseProductForm.controls.purchasePrice.value;
    this.singleProduct.quantity = this.purchaseProductForm.controls.quantity.value;
    this.singleProduct.sellerId = this.purchaseProductForm.controls.supplier.value;
    this.single.push(this.singleProduct);
    this.purchaseProductForm.reset();
    this.purchaseProductForm.controls.supplier.setValue(this.selectedSupplier);
    const total = this.single.map(this.amount).reduce(this.sum);
    this.purchaseProductForm.controls.totalAmount.setValue(total);
    this.source.load(this.single);
  }

  calculateCost() {
    if (
      this.purchaseProductForm.controls.totalCost.value > 0 &&
      this.purchaseProductForm.controls.quantity.value > 0
    ) {
      this.purchaseProductForm.controls.purchasePrice.setValue(
        +this.purchaseProductForm.controls.totalCost.value /
          +this.purchaseProductForm.controls.quantity.value,
      );
    } else {
      this.purchaseProductForm.controls.purchasePrice.setValue(0);
    }
  }

  onClear() {
    this.purchaseProductForm.reset();
    this.purchaseProductForm.controls.supplier.setValue(this.selectedSupplier);
    const total = this.single.map(this.amount).reduce(this.sum);
    this.purchaseProductForm.controls.totalAmount.setValue(total);
    this.source.load(this.single);
  }

  getProductByBarcode(barcode: string) {
    this.productService.getProductByBarcode(barcode).subscribe(response => {
      if (response.barcode === null || response.pro_id === 0) {
        this.showToast(
          'danger',
          'Error!',
          'No product found against entered barcode.',
        );
        return;
      }
      this.purchaseProductForm.controls.totalCost.setValue(0);
      this.purchaseProductForm.controls.quantity.setValue(0);
      this.purchaseProductForm.controls.productName.setValue(response.name);
      this.purchaseProductForm.controls.pro_id.setValue(response.pro_id);
      this.purchaseProductForm.controls.purchasePrice.setValue(
        response.purchase_price,
      );
    });
  }

  onConfirmEdit(event): void {
    event.confirm.resolve();
    this.showUpdatedItem(event);
    const total = this.single.map(this.amount).reduce(this.sum);
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

  // Methods to find old object and replace it with your object starts
  showUpdatedItem(newItem) {
    const updateItem = this.single.find(
      this.findIndexToUpdate,
      newItem.newData.barcode,
    );
    const index = this.single.indexOf(updateItem);
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
    this.purchaseOrder.creditorAcc_Id = this.purchaseProductForm.controls.fromAccount.value;
    this.purchaseOrder.orderDetails = this.single;
    this.productService.addPurchaseOrder(this.purchaseOrder).subscribe(
      response => {
        this.purchaseProductForm.reset();
        this.source.load(this.emptyGrid);
        this.showToast(
          'success',
          'Success!',
          'Purchase has been entered into system successfully.',
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
            'An error occured while entering Purchase.',
          );
        }
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
