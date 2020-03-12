import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MaintenanceComponent } from "./maintenance.component";
import { UsersComponent } from "./users/users.component";
import { SuppliersComponent } from "./suppliers/suppliers.component";
import { EmployeesComponent } from "./employees/employees.component";
import { SalariesComponent } from "./salaries/salaries.component";
import { CategoriesComponent } from "./categories/categories.component";
import { PaymentsComponent } from "./payments/payments.component";
import { AdminGuard } from "../../guards/admin-guard.service";
import { AccountsComponent } from "./accounts/accounts.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { CustomersComponent } from "./customers/customers.component";
import { AdvancesComponent } from "./advances/advances.component";

const routes: Routes = [
  {
    path: "",
    component: MaintenanceComponent,
    children: [
      {
        path: "accounts",
        component: AccountsComponent
      },
      {
        path: "advances",
        component: AdvancesComponent
      },
      {
        path: "users",
        component: UsersComponent
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
        path: "customers",
        component: CustomersComponent
      },
      {
        path: "salaries",
        component: SalariesComponent
      },
      {
        path: "transactions",
        component: TransactionsComponent
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
