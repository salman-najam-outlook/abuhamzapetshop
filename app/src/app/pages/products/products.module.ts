import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { AddEditComponent } from './addedit/addedit.component';
import { ProductsComponent } from './products.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase/purchase.component';
import { SalesComponent } from './sales/sales.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { ExpiredComponent } from './expired/expired.component';

@NgModule({
  imports: [
    ThemeModule,
    ReactiveFormsModule,
    CommonModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NgxBarcodeModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    ProductsRoutingModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ProductsComponent,
    AddEditComponent,
    PurchaseComponent,
    SalesComponent,
    ExpiredComponent,
  ],
})
export class ProductsModule { }
