import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Supplier } from '../models/supplier.model';
import { Employee } from '../models/employee.model';
import { Salary } from '../models/salary.model';
import { MainCategory } from '../models/mainCategory.model';
import { Category } from '../models/category.model';
import { SubCategory } from '../models/subCategory.model';
import { FourthSubCategory } from '../models/fourthSubCategory.model';
import { PendingPayments } from '../models/pendingPayment.model';
import { Payment } from '../models/payment.model';
import { Account } from '../models/account.model';
import { CashTransaction } from '../models/cashTransaction.model';
import { Customer } from '../models/customer.model';
import { Advance } from '../models/advance.model';
import { UpdateAdvance } from '../models/updateAdvance.model';
import { ManageAdvance } from '../models/manageAdvance.model';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  constructor(private httpClient: HttpClient) {}

  // For Users
  addUpdateUser(user: User) {
    return this.httpClient.post<User>(
      'https://abuhamzaapi.sizzlingmart.com/api/users/AddUpdateUser',
      user,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/users/GetAllUsers',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  deleteUser(id: number): Observable<string> {
    return this.httpClient.delete<string>(
      'https://abuhamzaapi.sizzlingmart.com/api/users/DeleteUser/' + id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  // For Employees
  addUpdateEmployee(employee: Employee) {
    return this.httpClient.post<Employee>(
      'https://abuhamzaapi.sizzlingmart.com/api/employees/AddUpdateEmployee',
      employee,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/employees/GetAllEmployees',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  deleteEmployee(id: number): Observable<string> {
    return this.httpClient.delete<string>(
      'https://abuhamzaapi.sizzlingmart.com/api/employees/DeleteEmployee/' + id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  // For Suppliers
  addUpdateSupplier(supplier: Supplier) {
    return this.httpClient.post<Supplier>(
      'https://abuhamzaapi.sizzlingmart.com/api/suppliers/AddUpdateSupplier',
      supplier,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getAllSuppliers(): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/suppliers/GetAllSuppliers',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  deleteSupplier(id: number): Observable<string> {
    return this.httpClient.delete<string>(
      'https://abuhamzaapi.sizzlingmart.com/api/suppliers/DeleteSupplier/' + id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  // For Vouchers

  getPendingVouchersBySupplierID(
    supplierId: number,
  ): Observable<PendingPayments[]> {
    return this.httpClient.get<PendingPayments[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/vouchers/GetPendingVouchersBySupplierID/' +
        supplierId,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getPendingVouchersOfSale(): Observable<PendingPayments[]> {
    return this.httpClient.get<PendingPayments[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/vouchers/GetPendingVouchersOfSale',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getPendingVouchersOfAdvance(): Observable<PendingPayments[]> {
    return this.httpClient.get<PendingPayments[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/vouchers/GetPendingVouchersOfAdvance',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getPendingVouchersOfPurchase(): Observable<PendingPayments[]> {
    return this.httpClient.get<PendingPayments[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/vouchers/GetPendingVouchersOfPurchase',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getAllPendingVouchers(): Observable<PendingPayments[]> {
    return this.httpClient.get<PendingPayments[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/vouchers/GetAllPendingVouchers',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  paymentAgainstSupplier(payment: Payment): Observable<any> {
    return this.httpClient.post<any>(
      'https://abuhamzaapi.sizzlingmart.com/api/vouchers/pendingOrderPayment',
      payment,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  // For Salaries
  addUpdateSalary(supplier: Salary) {
    return this.httpClient.post<Salary>(
      'https://abuhamzaapi.sizzlingmart.com/api/salaries/AddUpdateSalary',
      supplier,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getAllSalaries(): Observable<Salary[]> {
    return this.httpClient.get<Salary[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/salaries/GetAllSalaries',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  deleteSalary(id: number): Observable<string> {
    return this.httpClient.delete<string>(
      'https://abuhamzaapi.sizzlingmart.com/api/salaries/DeleteSalary/' + id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  // For Accounts
  addUpdateAccount(account: Account) {
    return this.httpClient.post<Account>(
      'https://abuhamzaapi.sizzlingmart.com/api/accounts/AddUpdateAccount',
      account,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getAllAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/accounts/GetAllAccounts',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  deleteAccount(id: number): Observable<string> {
    return this.httpClient.delete<string>(
      'https://abuhamzaapi.sizzlingmart.com/api/accounts/DeleteAccount/' + id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  // Main Category
  addUpdateMainCategory(mainCategory: MainCategory) {
    return this.httpClient.post<MainCategory>(
      'https://abuhamzaapi.sizzlingmart.com/api/mainCategories/AddUpdateMainCategory',
      mainCategory,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getAllMainCategories(): Observable<MainCategory[]> {
    return this.httpClient.get<MainCategory[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/mainCategories/GetAllMainCategories',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  deleteMainCategory(id: number): Observable<string> {
    return this.httpClient.delete<string>(
      'https://abuhamzaapi.sizzlingmart.com/api/mainCategories/DeleteMainCategory/' + id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  // Category
  addUpdateCategory(category: Category) {
    return this.httpClient.post<Category>(
      'https://abuhamzaapi.sizzlingmart.com/api/categories/AddUpdateCategory',
      category,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/categories/GetAllCategories',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getAllCategoriesByMainCategoryId(id: number): Observable<Category[]> {
    return this.httpClient.get<Category[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/categories/GetAllCategoriesByMainCategoryId/' +
        id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  deleteCategory(id: number): Observable<string> {
    return this.httpClient.delete<string>(
      'https://abuhamzaapi.sizzlingmart.com/api/categories/DeleteCategory/' + id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  // Sub Category
  addUpdateSubCategory(subCategory: SubCategory) {
    return this.httpClient.post<SubCategory>(
      'https://abuhamzaapi.sizzlingmart.com/api/SubCategories/AddUpdateSubCategory',
      subCategory,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getAllSubCategories(): Observable<SubCategory[]> {
    return this.httpClient.get<SubCategory[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/SubCategories/GetAllSubCategories',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getAllSubCategoriesByCategoryId(id: number): Observable<SubCategory[]> {
    return this.httpClient.get<SubCategory[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/SubCategories/GetSubCategoriesByCategoryId/' +
        id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  deleteSubCategory(id: number): Observable<string> {
    return this.httpClient.delete<string>(
      'https://abuhamzaapi.sizzlingmart.com/api/SubCategories/DeleteSubCategory/' + id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  // Forth Sub Category
  addUpdateForthSubCategory(forthSubCategory: FourthSubCategory) {
    return this.httpClient.post<FourthSubCategory>(
      'https://abuhamzaapi.sizzlingmart.com/api/ForthSubCategories/AddUpdateForthSubCategory',
      forthSubCategory,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getAllForthSubCategories(): Observable<FourthSubCategory[]> {
    return this.httpClient.get<FourthSubCategory[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/ForthSubCategories/GetAllForthSubCategories',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getAllForthSubCategoriesByCategoryId(
    id: number,
  ): Observable<FourthSubCategory[]> {
    return this.httpClient.get<FourthSubCategory[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/ForthSubCategories/GetForthSubCategoriesbySubCategoryid/' +
        id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  deleteForthSubCategory(id: number): Observable<string> {
    return this.httpClient.delete<string>(
      'https://abuhamzaapi.sizzlingmart.com/api/ForthSubCategories/DeleteForthSubCategory/' +
        id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  //Cash Transaction
  sendAmount(cashTransaction: CashTransaction) {
    return this.httpClient.post<CashTransaction>(
      'https://abuhamzaapi.sizzlingmart.com/api/accounts/CashTransaction',
      cashTransaction,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  GetFromAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/accounts/GetFromAccounts',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  GetToAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/accounts/GetToAccounts',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }
  //Customer
  addUpdateCustomer(customer: Customer) {
    return this.httpClient.post<Customer>(
      'https://abuhamzaapi.sizzlingmart.com/api/customers/AddUpdateCustomer',
      customer,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/customers/GetAllCustomers',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getCustomersByType(typeNumber: number): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/customers/GetCustomersByAccountTypeId/' + typeNumber,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  deleteCustomer(id: number): Observable<string> {
    return this.httpClient.delete<string>(
      'https://abuhamzaapi.sizzlingmart.com/api/customers/DeleteCustomer/' + id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  //Advance
  addUpdateAdvance(advance: Advance) {
    return this.httpClient.post<Advance>(
      'https://abuhamzaapi.sizzlingmart.com/api/advances/AddUpdateAdvance',
      advance,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getAllAdvances(): Observable<Advance[]> {
    return this.httpClient.get<Advance[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/advances/GetAllAdvances',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getAdvanceByVoucherNo(voucherNo: string): Observable<Advance> {
    return this.httpClient.get<Advance>(
      'https://abuhamzaapi.sizzlingmart.com/api/advances/GetAdvanceByVoucherNo/' + voucherNo,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  deleteAdvance(id: number): Observable<string> {
    return this.httpClient.delete<string>(
      'https://abuhamzaapi.sizzlingmart.com/api/advances/DeleteAdvance/' + id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  addUpdateAdvanceByVoucher(vouchers: UpdateAdvance[]) {
    return this.httpClient.post<UpdateAdvance>(
      'https://abuhamzaapi.sizzlingmart.com/api/advances/AddUpdateAdvanceByVoucher',
      vouchers,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  manageAdvance(manageAdvance: ManageAdvance) {
    return this.httpClient.post<ManageAdvance>(
      'https://abuhamzaapi.sizzlingmart.com/api/advances/UpdateAdvanceByVoucher',
      manageAdvance,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }
}
