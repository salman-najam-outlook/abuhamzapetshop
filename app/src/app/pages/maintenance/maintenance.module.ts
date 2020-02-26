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
import { Ng2SmartTableModule } from "ng2-smart-table";
import { ThemeModule } from "../../@theme/theme.module";
import { UsersRoutingModule } from "./maintenance-routing.module";
import { SuppliersComponent } from "./suppliers/suppliers.component";
import { EmployeesComponent } from "./employees/employees.component";
import { UsersComponent } from "./users/users.component";
import { MaintenanceComponent } from "./maintenance.component";
import { SalariesComponent } from "./salaries/salaries.component";
import { CategoriesComponent } from './categories/categories.component';
import { MCategoriesAddEditComponent } from './categories/mcategories-add-edit-model/mcategories-add-edit-model.component';
import { CategoriesAddEditComponent } from './categories/categories-add-edit-model/categories-add-edit-model.component';
import { PaymentsComponent } from './payments/payments.component';
import { FormsModule as ngFormsModule, ReactiveFormsModule } from '@angular/forms';


const ENTRY_COMPONENTS = [
  MCategoriesAddEditComponent,
  CategoriesAddEditComponent
];

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    ngFormsModule,
    NbSelectModule,
    ReactiveFormsModule,
    NbListModule,
    ThemeModule,
    NbMenuModule,
    UsersRoutingModule,
    Ng2SmartTableModule,
    NbDialogModule.forChild(),
  ],
  declarations: [
    SalariesComponent,
    EmployeesComponent,
    SuppliersComponent,
    UsersComponent,
    MaintenanceComponent,
    MCategoriesAddEditComponent,
    CategoriesAddEditComponent,
    CategoriesComponent,
    PaymentsComponent
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class MaintenanceModule {}
