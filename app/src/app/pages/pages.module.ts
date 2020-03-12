import { NgModule } from "@angular/core";
import {
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbTreeGridModule,
  NbButtonModule,
  NbListModule,
  NbDialogModule,
  NbMenuModule,
  NbSelectModule
} from "@nebular/theme";
import { FormsModule as ngFormsModule } from "@angular/forms";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { MaintenanceModule } from "./maintenance/maintenance.module";
import { ProductsModule } from "./products/products.module";
import { CustomersAddComponent } from "./products/sales/customers-add-model/customers-add-model.component";
import { SalesComponent } from "./products/sales/sales.component";

const ENTRY_COMPONENTS = [CustomersAddComponent];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MaintenanceModule,
    ProductsModule,
    NbCardModule,
    ngFormsModule,
    FormsModule,
    ReactiveFormsModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbListModule,
    ThemeModule,
    NbMenuModule,
    NbDialogModule.forChild()
  ],
  declarations: [PagesComponent, CustomersAddComponent],
  entryComponents: [...ENTRY_COMPONENTS]
})
export class PagesModule {}
