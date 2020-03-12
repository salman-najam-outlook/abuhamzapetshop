import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SingleProduct } from "../../../models/singleProduct.model";
import { ProductService } from "../../../services/product.service";
import {
  NbGlobalPosition,
  NbGlobalPhysicalPosition,
  NbComponentStatus,
  NbToastrService,
  NbDialogService
} from "@nebular/theme";
import { SaleOrder } from "../../../models/saleOrder.model";
import { Product } from "../../../models/product.model";
import { Customer } from "../../../models/customer.model";
import { CustomersAddComponent } from "./customers-add-model/customers-add-model.component";
import { MaintenanceService } from "../../../services/maintenance.service";

@Component({
  selector: "ngx-sales",
  styleUrls: ["./sales.component.scss"],
  templateUrl: "./sales.component.html"
})
export class SalesComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  singleProductList: SingleProduct[] = [];
  emptyProduct: SingleProduct[] = [];
  singleProduct: SingleProduct;
  saleOrderForm: FormGroup;
  saleOrder: SaleOrder;
  subTotal: number = 0;
  grandTotal: number = 0;
  remainingCash: number = 0;
  discount: number = 0;
  tenderAmount: number = 0;
  barcode: string = "";
  product: Product;
  customer: Customer;
  isAdvanceVisible: boolean;

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
        title: "Barcode",
        type: "string",
        editable: false
      },
      productName: {
        title: "Name",
        type: "string",
        editable: false
      },
      sellPrice: {
        title: "Price",
        type: "number",
        editable: false
      },
      quantity: {
        title: "Quantity",
        stype: "number"
      },
      totalAmount: {
        title: "Total",
        stype: "number",
        editable: false,
        valuePrepareFunction: (cell, row) => {
          return row.sellPrice * row.quantity;
        }
      }
    }
  };

  constructor(
    private productService: ProductService,
    private dialogService: NbDialogService,
    private maintenanceService: MaintenanceService,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.saleOrderForm = new FormGroup({
      barcode: new FormControl(""),
      voucherno: new FormControl(""),
      tenderAmount: new FormControl("", Validators.required),
      subTotal: new FormControl(""),
      discount: new FormControl(""),
      grandTotal: new FormControl(""),
      advance: new FormControl("")
    });
    this.source.load(this.singleProductList);
    this.isAdvanceVisible = false;
  }

  onChange(discount: number): void {
    this.grandTotal = this.subTotal - discount;
    this.discount = discount;
  }

  onTenderAmountEntered(tenderAmount: number): void {
    this.remainingCash = tenderAmount - this.grandTotal;
    this.tenderAmount = tenderAmount;
  }

  getProductByBarcode(barcode: string) {
    if (barcode == "" || barcode == null) {
      return;
    }
    this.productService.getProductByBarcode(barcode).subscribe(response => {
      if (response.barcode === null || response.pro_id === 0) {
        this.showToast(
          "danger",
          "Error!",
          "No product found against entered barcode."
        );
        return;
      }
      this.singleProduct = new SingleProduct();
      this.product = response;
      this.singleProduct.barcode = response.barcode;
      let updateItem = this.singleProductList.find(
        this.findIndexToUpdate,
        this.product.barcode
      );
      if (updateItem !== undefined) {
        updateItem.quantity = +updateItem.quantity + 1;
        updateItem.totalAmount = updateItem.sellPrice * updateItem.quantity;
        let index = this.singleProductList.indexOf(updateItem);
        this.singleProductList[index] = updateItem;
        this.subTotal = this.singleProductList
          .map(item => item.totalAmount)
          .reduce((prev, next) => prev + next);
        this.grandTotal = this.subTotal;
        this.source.load(this.singleProductList);
      } else {
        this.singleProduct.productName = response.name;
        this.singleProduct.sellPrice = response.sell_price;
        this.singleProduct.quantity = this.product.quantity;
        this.singleProduct.quantity = 1;
        this.singleProduct.totalAmount =
          this.singleProduct.sellPrice * this.singleProduct.quantity;
        this.singleProductList.push(this.singleProduct);
        this.subTotal = this.singleProductList
          .map(item => item.totalAmount)
          .reduce((prev, next) => prev + next);
        this.grandTotal = this.subTotal;
        this.source.load(this.singleProductList);
      }
      this.subTotal = this.singleProductList
        .map(item => item.totalAmount)
        .reduce((prev, next) => prev + next);
      this.grandTotal = this.subTotal;
      this.product = new Product();
    });
  }

  getAdvanceByVoucherNo(voucherNo: string) {
    if (voucherNo == "" || voucherNo == null) {
      return;
    }
    this.maintenanceService.getAdvanceByVoucherNo(voucherNo).subscribe(
      response => {
        this.saleOrderForm.controls.advance.setValue(+response.amount);
        this.isAdvanceVisible = true;
      },
      error => {
        this.showToast(
          "danger",
          "Error!",
          "An error occured while fetching voucher details!"
        );
      }
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      event.confirm.resolve();
      this.showToast(
        "success",
        "Success!",
        "Targeted record has been deleted successfully."
      );
      this.singleProductList = this.singleProductList.filter(
        singleProductList => singleProductList.barcode !== event.data.barcode
      );
      if (this.singleProductList.length === 0) {
        this.subTotal = 0;
        this.grandTotal = this.subTotal;
      } else {
        this.subTotal = this.singleProductList
          .map(item => item.totalAmount)
          .reduce((prev, next) => prev + next);
        this.grandTotal = this.subTotal;
      }
      this.source.load(this.singleProductList);
    } else {
      event.confirm.reject();
    }
  }

  onConfirmEdit(event): void {
    event.confirm.resolve();
    this.showUpdatedItem(event);
    var total = this.singleProductList.map(this.amount).reduce(this.sum);
    this.saleOrderForm.controls.totalAmount.setValue(total);
  }

  onClick() {
    this.source.getAll().then(res => {
      this.singleProductList = res;
    });
  }

  onAddEditMainCategory() {}

  onSubmit() {
    if (+this.tenderAmount < +this.grandTotal) {
      this.dialogService
        .open(CustomersAddComponent, {
          context: {
            customer: this.customer
          }
        })
        .onClose.subscribe(response => {
          this.saleOrder = new SaleOrder();
          this.saleOrder.subTotal = +this.subTotal;
          this.saleOrder.discount = +this.discount;
          this.saleOrder.grandTotal = +this.grandTotal;
          this.saleOrder.tenderAmount = +this.tenderAmount;
          this.saleOrder.remainingCash = this.remainingCash;
          this.saleOrder.singleProductList = this.singleProductList;
          this.productService.addInvoice(this.saleOrder).subscribe(
            response => {
              this.showToast(
                "success",
                "Success!",
                "A new sale has been entered into the system!"
              );
              this.saleOrderForm.reset();
              this.subTotal = 0;
              this.grandTotal = 0;
              this.remainingCash = 0;
              this.discount = 0;
              this.tenderAmount = 0;
              this.barcode = "";
              this.source.load(this.emptyProduct);
            },
            error => {
              this.showToast(
                "danger",
                "Error!",
                "An error occured while submitting Sale!"
              );
            }
          );
        });
    } else {
      this.saleOrder = new SaleOrder();
      this.saleOrder.subTotal = +this.subTotal;
      this.saleOrder.discount = +this.discount;
      this.saleOrder.grandTotal = +this.grandTotal;
      this.saleOrder.tenderAmount = +this.tenderAmount;
      this.saleOrder.remainingCash = this.remainingCash;
      this.saleOrder.singleProductList = this.singleProductList;
      this.productService.addInvoice(this.saleOrder).subscribe(
        response => {
          this.showToast(
            "success",
            "Success!",
            "A new sale has been entered into the system!"
          );
          this.saleOrderForm.reset();
          this.subTotal = 0;
          this.grandTotal = 0;
          this.remainingCash = 0;
          this.discount = 0;
          this.tenderAmount = 0;
          this.barcode = "";
          this.source.load(this.emptyProduct);
        },
        error => {
          this.showToast(
            "danger",
            "Error!",
            "An error occured while submitting Sale!"
          );
        }
      );
    }
  }

  // Methods to calculate total amount along with quantity starts
  amount(item) {
    return item.totalAmount;
  }

  sum(prev, next) {
    return prev + next;
  }
  // Methods to calculate total amount along with quantity ends

  // Methods to find old object and replace it with your object starts
  showUpdatedItem(newItem) {
    newItem.newData.totalAmount =
      newItem.newData.sellPrice * newItem.newData.quantity;
    let updateItem = this.singleProductList.find(
      this.findIndexToUpdate,
      newItem.newData.barcode
    );
    let index = this.singleProductList.indexOf(updateItem);
    this.singleProductList[index] = newItem.newData;
    this.subTotal = this.singleProductList.map(this.amount).reduce(this.sum);
    this.grandTotal = this.subTotal;
    this.remainingCash = 0;
    this.discount = 0;
    this.source.load(this.singleProductList);
  }

  findIndexToUpdate(newItem) {
    return newItem.barcode === this;
  }
  // Methods to find old object and replace it with your object ends

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
