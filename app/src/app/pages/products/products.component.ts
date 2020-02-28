import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-form-elements',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class ProductsComponent {
  constructor(private router: Router) {
    this.router.navigate(['pages/products/sales']);
  }
}
