import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaintenanceService } from '../../../services/maintenance.service';
import { MainCategory } from '../../../models/mainCategory.model';
import { Category } from '../../../models/category.model';
import { SubCategory } from '../../../models/subCategory.model';
import { FourthSubCategory } from '../../../models/fourthSubCategory.model';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import {
  NbGlobalPosition,
  NbGlobalPhysicalPosition,
  NbToastrService,
  NbComponentStatus,
} from '@nebular/theme';

@Component({
  selector: 'ngx-add-edit',
  styleUrls: ['./addedit.component.scss'],
  templateUrl: './addedit.component.html',
})
export class AddEditComponent implements OnInit {
  mainCategories: MainCategory[];
  categories: Category[];
  subCategories: SubCategory[];
  fourthCategories: FourthSubCategory[];
  productToAdd: Product;
  productAddEditForm: FormGroup;
  selectedMainCategoryId: any;
  selectedCategoryId: any;
  selectedSubCategoryId: any;
  selectedFourthCategoryId: any;
  source: LocalDataSource = new LocalDataSource();
  value: string = 'Abu-Hamza-Pet-Store';

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
      name: {
        title: 'Name',
        type: 'string',
        editable: false,
      },
      purchase_price: {
        title: 'Purchasing Price',
        type: 'number',
      },
      sell_price: {
        title: 'Selling Price',
        type: 'number',
      },
      quantity: {
        title: 'Quantity',
        type: 'number',
        editable: false,
      },
      description: {
        title: 'Description',
        type: 'string',
        width: '25%',
      },
    },
  };

  constructor(
    private maintenanceService: MaintenanceService,
    private productService: ProductService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit() {
    this.maintenanceService.getAllMainCategories().subscribe(
      response => {
        this.mainCategories = response;
      },
      error => {
        this.showToast(
          'danger',
          'Error!',
          'An error occured while fetching Main Categories.',
        );
      },
    );
    this.maintenanceService.getAllCategories().subscribe(
      response => {
        this.categories = response;
      },
      error => {
        this.showToast(
          'danger',
          'Error!',
          'An error occured while fetching Categories.',
        );
      },
    );
    this.maintenanceService.getAllSubCategories().subscribe(
      response => {
        this.subCategories = response;
      },
      error => {
        this.showToast(
          'danger',
          'Error!',
          'An error occured while fetching Sub Categories.',
        );
      },
    );
    this.maintenanceService.getAllForthSubCategories().subscribe(
      response => {
        this.fourthCategories = response;
      },
      error => {
        this.showToast(
          'danger',
          'Error!',
          'An error occured while fetching Fourth Categories.',
        );
      },
    );
    this.productService.getAllProducts().subscribe(
      response => {
        this.source.load(response);
      },
      error => {
        this.showToast(
          'danger',
          'Error!',
          'An error occured while fetching Products list.',
        );
      },
    );

    this.productAddEditForm = new FormGroup({
      mainCategoryId: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      subCategoryId: new FormControl(''),
      fourthCategoryId: new FormControl(''),
      barcode: new FormControl('', Validators.required),
      productId: new FormControl(''),
      name: new FormControl('', Validators.required),
      originalPrice: new FormControl('', Validators.required),
      markupPrice: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.productService.deleteProduct(event.data.pro_id).subscribe(
        response => {
          this.showToast(
            'success',
            'Success!',
            'Targeted product has been deleted successfully!',
          );
          this.productService.getAllProducts().subscribe(
            // tslint:disable-next-line: no-shadowed-variable
            response => {
              this.source.load(response);
            },
            error => {
              this.showToast(
                'danger',
                'Error!',
                'An error occured while fetching all products!',
              );
            },
          );
        },
        error => {
          this.showToast(
            'danger',
            'Error!',
            'An error occured while deleting product!',
          );
        },
      );
    } else {
      event.confirm.reject();
    }
  }

  onChange(event) {
    this.value = this.productAddEditForm.controls.barcode.value;
  }

  onMainCategorySelect(event): void {
    this.categories = [];
    this.subCategories = [];
    this.fourthCategories = [];
    this.selectedCategoryId = null;
    this.selectedSubCategoryId = null;
    this.selectedFourthCategoryId = null;
    this.maintenanceService.getAllCategoriesByMainCategoryId(event).subscribe(
      response => {
        this.categories = response;
      },
      error => {
        this.showToast(
          'danger',
          'Error!',
          'An error occured while fetching Main categories.',
        );
      },
    );
  }

  onCategorySelect(event): void {
    this.subCategories = [];
    this.fourthCategories = [];
    this.selectedSubCategoryId = null;
    this.selectedFourthCategoryId = null;
    this.maintenanceService.getAllSubCategoriesByCategoryId(event).subscribe(
      response => {
        this.subCategories = response;
      },
      error => {
        this.showToast(
          'danger',
          'Error!',
          'An error occured while fetching Sub categories.',
        );
      },
    );
  }

  onSubCategorySelect(event): void {
    this.fourthCategories = [];
    this.selectedFourthCategoryId = null;
    this.maintenanceService
      .getAllForthSubCategoriesByCategoryId(event)
      .subscribe(
        response => {
          this.fourthCategories = response;
        },
        error => {
          this.showToast(
            'danger',
            'Error!',
            'An error occured while fetching Fourth categories.',
          );
        },
      );
  }

  onSubmit() {
    const isValid = false;
    if (!this.validateForm(isValid)) {
      return;
    }

    this.productToAdd = new Product();
    this.productToAdd.pro_id = this.productAddEditForm.controls.productId.value;
    this.productToAdd.barcode = this.productAddEditForm.controls.barcode.value;
    this.productToAdd.name = this.productAddEditForm.controls.name.value;
    this.productToAdd.description = this.productAddEditForm.controls.description.value;
    this.productToAdd.purchase_price = this.productAddEditForm.controls.originalPrice.value;
    this.productToAdd.quantity = 0;
    this.productToAdd.sell_price = this.productAddEditForm.controls.markupPrice.value;
    this.productToAdd.mainCat_id = this.productAddEditForm.controls.mainCategoryId.value;
    this.productToAdd.cat_id = this.productAddEditForm.controls.categoryId.value;
    this.productToAdd.subCat_id = this.productAddEditForm.controls.subCategoryId.value;
    this.productToAdd.fsubCat_id = this.productAddEditForm.controls.fourthCategoryId.value;
    this.productService.addUpdateProduct(this.productToAdd).subscribe(
      response => {
        this.value = 'TempName';
        if (response === 'updated') {
          this.showToast(
            'info',
            'Success!',
            'Product has been updated successfully.',
          );
        } else {
          this.showToast(
            'success',
            'Success!',
            'New Product has been added successfully.',
          );
        }
        this.productAddEditForm.reset();
        this.value = 'TempName';
        this.productService.getAllProducts().subscribe(
          // tslint:disable-next-line: no-shadowed-variable
          response => {
            this.source.load(response);
          },
          error => {
            this.showToast(
              'danger',
              'Error!',
              'An error occured while fetching records.',
            );
          },
        );
      },
      error => {
        this.showToast('danger', 'Error!', 'Unable to add new Product.');
      },
    );
  }

  onRowSelect(event) {
    this.productService.getProductByProductId(event.data.pro_id).subscribe(
      response => {
        this.value = response.barcode;
        this.productAddEditForm.controls.productId.setValue(response.pro_id);
        this.productAddEditForm.controls.barcode.setValue(response.barcode);
        this.productAddEditForm.controls.name.setValue(response.name);
        this.productAddEditForm.controls.description.setValue(
          response.description,
        );
        this.productAddEditForm.controls.originalPrice.setValue(
          response.purchase_price,
        );
        this.productAddEditForm.controls.markupPrice.setValue(
          response.sell_price,
        );
        this.productAddEditForm.controls.mainCategoryId.setValue(
          response.mainCat_id,
        );
        this.productAddEditForm.controls.categoryId.setValue(response.cat_id);
        this.productAddEditForm.controls.subCategoryId.setValue(
          response.subCat_id,
        );
        this.productAddEditForm.controls.fourthCategoryId.setValue(
          response.fsubCat_id,
        );
        this.productService
          .getSavedCategories(
            this.productAddEditForm.controls.mainCategoryId.value,
            this.productAddEditForm.controls.categoryId.value,
            this.productAddEditForm.controls.subCategoryId.value,
          )
          .subscribe(
            res => {
              this.categories = res[0];
              this.subCategories = res[1];
              this.fourthCategories = res[2];
              this.selectedMainCategoryId = this.productAddEditForm.controls.mainCategoryId.value;
              this.selectedCategoryId = this.productAddEditForm.controls.categoryId.value;
              this.selectedSubCategoryId = this.productAddEditForm.controls.subCategoryId.value;
              this.selectedFourthCategoryId = this.productAddEditForm.controls.fourthCategoryId.value;
            },
            err => {
              // this.showToast(
              //   'danger',
              //   'Error!',
              //   'An error occured while fetching records.',
              // );
            },
          );
      },
      error => {
        this.showToast(
          'danger',
          'Error!',
          'An error occured while fetching records.',
        );
      },
    );
  }

  onClear() {
    this.mainCategories = [];
    this.categories = [];
    this.subCategories = [];
    this.fourthCategories = [];
    this.selectedMainCategoryId = null;
    this.selectedCategoryId = null;
    this.selectedSubCategoryId = null;
    this.selectedFourthCategoryId = null;
    this.productAddEditForm.controls.productId.setValue('');
    this.productAddEditForm.controls.name.setValue('');
    this.productAddEditForm.controls.originalPrice.setValue('');
    this.productAddEditForm.controls.barcode.setValue('Abu-Hamza-Pet-Store');
    this.productAddEditForm.controls.markupPrice.setValue('');
    this.productAddEditForm.controls.description.setValue('');
    this.productAddEditForm.controls.productId.setValue('');
    this.productAddEditForm.controls.productId.setValue('');
    this.maintenanceService.getAllMainCategories().subscribe(
      response => {
        this.mainCategories = response;
      },
      error => {
        this.showToast(
          'danger',
          'Error!',
          'An error occured while fetching Main Categories.',
        );
      },
    );
  }

  get values(): string[] {
    return this.value.split('\n');
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

  private validateForm(isValid: boolean): boolean {
    isValid = false;
    if (this.productAddEditForm.controls.barcode.value === '') {
      this.showToast('danger', 'Error!', 'Please enter barcode.');
      return;
    }
    if (this.productAddEditForm.controls.name.value === '') {
      this.showToast('danger', 'Error!', 'Please enter product name.');
      return;
    }
    if (this.productAddEditForm.controls.originalPrice.value == null) {
      this.showToast('danger', 'Error!', 'Please enter orignal price.');
      return;
    }
    if (this.productAddEditForm.controls.markupPrice.value == null) {
      this.showToast('danger', 'Error!', 'Please enter markup price.');
      return;
    }
    if (this.productAddEditForm.controls.mainCategoryId.value === '') {
      this.showToast('danger', 'Error!', 'Please select main category.');
      return;
    }
    if (this.productAddEditForm.controls.categoryId.value === '') {
      this.showToast('danger', 'Error!', 'Please select first sub category.');
      return;
    }
    isValid = true;
    return isValid;
  }
}
