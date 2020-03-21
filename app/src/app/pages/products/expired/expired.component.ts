import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import {
  NbGlobalPosition,
  NbGlobalPhysicalPosition,
  NbComponentStatus,
  NbToastrService,
} from '@nebular/theme';
import { Expired } from '../../../models/expired.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-products',
  styleUrls: ['./expired.component.scss'],
  templateUrl: './expired.component.html',
})
export class ExpiredComponent implements OnInit {
  expiredForm: FormGroup;
  expiredProduct: Expired = new Expired();

  // Toaster Setting Starts
  index = 1;
  destroyByClick = true;
  duration = 5000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  // Toaster Setting Ends

  constructor(
    private productService: ProductService,
    private toastrService: NbToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.expiredForm = new FormGroup({
      barcode: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      desc: new FormControl(''),
    });
  }

  getProductByBarcode(barcode: string) {
    if (barcode === '' || barcode == null) {
      return;
    }
    this.productService.getProductByBarcode(barcode).subscribe(response => {
      if (response.barcode === null || response.pro_id === 0) {
        this.showToast(
          'danger',
          'Error!',
          'No product found against entered barcode.',
        );
        this.expiredForm.controls.barcode.setValue('');
        return;
      }
    });
  }

  onClear() {
    this.expiredForm.reset();
  }

  onSubmit() {
    this.expiredProduct.barcode = this.expiredForm.controls.barcode.value;
    this.expiredProduct.quantity = this.expiredForm.controls.quantity.value;
    this.expiredProduct.desc = this.expiredForm.controls.desc.value;
    this.productService.addExpiredProduct(this.expiredProduct).subscribe(
        (response) => {
            if (response === true) {
                this.showToast(
                    'success',
                    'Success!',
                    'Expired product has been entered into the system successfully.',
                  );
            }

        },
        (error) => {
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
            'An error occured while entering Expired product.',
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
