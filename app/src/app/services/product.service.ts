import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Product } from '../models/product.model';
import { PurchaseOrder } from '../models/purchaseOrder.model';
import { SaleOrder } from '../models/saleOrder.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) { }

  // Add Product

  getProductByProductId(productId: number) {
    return this.httpClient.get<Product>(
      'https://abuhamzaapi.sizzlingmart.com/api/products/GetProductById/' + productId,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getProductByBarcode(barcode: string): Observable<Product>  {
    return this.httpClient.get<Product>(
      'https://abuhamzaapi.sizzlingmart.com/api/products/GetProductByBarcode/' + barcode,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  addUpdateProduct(product: Product): Observable<string> {
    return this.httpClient.post<string>(
      'https://abuhamzaapi.sizzlingmart.com/api/products/AddUpdateProduct',
      product,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/products/GetAllProducts',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  deleteProduct(id: number): Observable<string> {
    return this.httpClient.delete<string>(
      'https://abuhamzaapi.sizzlingmart.com/api/products/DeleteProduct/' + id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  // Sales

  // Purchase Order

  getAllPurchaseOrders(): Observable<PurchaseOrder[]> {
    return this.httpClient.get<PurchaseOrder[]>(
      'https://abuhamzaapi.sizzlingmart.com/api/purchaseOrders/GetAllProductOrders',
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  deletePurchaseOrder(id: number): Observable<string> {
    return this.httpClient.delete<string>(
      'https://abuhamzaapi.sizzlingmart.com/api/purchaseOrders/DeleteProductOrder/' + id,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }

  getSavedCategories(mainCategoryId: number, categoryId: number, subCategoryId: number): Observable<any> {
    const response1 = this.httpClient.get('https://abuhamzaapi.sizzlingmart.com/api/categories/GetAllCategoriesByMainCategoryId/' + mainCategoryId);
    const response2 = this.httpClient.get('https://abuhamzaapi.sizzlingmart.com/api/SubCategories/GetSubCategoriesByCategoryId/' + categoryId);
    const response3 = this.httpClient.get('https://abuhamzaapi.sizzlingmart.com/api/ForthSubCategories/GetForthSubCategoriesbySubCategoryid/' + subCategoryId);
    return forkJoin([response1, response2, response3]);
  }

  addPurchaseOrder(purchaseOrder: PurchaseOrder): Observable<any> {
    return this.httpClient.post<PurchaseOrder>(
      'https://abuhamzaapi.sizzlingmart.com/api/purchaseOrders/AddUpdatePurchaseOrder',
      purchaseOrder,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }


  // Invoice Starts
  addInvoice(order: SaleOrder): Observable<string> {
    return this.httpClient.post<string>(
      'https://abuhamzaapi.sizzlingmart.com/api/invoices/AddUpdateInvoice',
      order,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        }),
      },
    );
  }
}
