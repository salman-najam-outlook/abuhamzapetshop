import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MaintenanceComponent } from "./maintenance.component";
import { UsersComponent } from "./users/users.component";
import { SuppliersComponent } from "./suppliers/suppliers.component";
import { EmployeesComponent } from "./employees/employees.component";
import { SalariesComponent } from "./salaries/salaries.component";
import { CategoriesComponent } from './categories/categories.component';
import { PaymentsComponent } from './payments/payments.component';
import { AdminGuard } from '../../guards/admin-guard.service';
import { AccountsComponent } from './accounts/accounts.component';

const routes: Routes = [
  {
    path: "",
    component: MaintenanceComponent, canActivate: [AdminGuard],
    children: [
      {
        path: "accounts",
        component: AccountsComponent
      },
      {
        path: "users",
        component: UsersComponent,
      },
      {
        path: "suppliers",
        component: SuppliersComponent
      },
      {
        path: "employees",
        component: EmployeesComponent
      },
      {
        path: "salaries",
        component: SalariesComponent
      },
      {
        path: "categories",
        component: CategoriesComponent
      },
      {
        path: "payments",
        component: PaymentsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}

export const routedComponents = [UsersComponent, MaintenanceComponent];
