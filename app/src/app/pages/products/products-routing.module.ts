import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AddEditComponent } from './addedit/addedit.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SalesComponent } from './sales/sales.component';
import { AdminGuard } from '../../guards/admin-guard.service';
import { UserGuard } from '../../guards/user-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: 'addedit',
        component: AddEditComponent, canActivate: [AdminGuard],
      },
      {
        path: 'purchase',
        component: PurchaseComponent, canActivate: [UserGuard],
      },
      {
        path: 'sales',
        component: SalesComponent, canActivate: [UserGuard],
      },
      { path: '', redirectTo: '/sales', pathMatch: 'full' },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
