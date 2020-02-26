import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, forkJoin } from "rxjs";
import { Product } from "../models/product.model";
import { PurchaseOrder } from "../models/purchaseOrder.model";
import { SaleOrder } from '../models/saleOrder.model';

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private httpClient: HttpClient) { }

  // Add Product

  getProductByProductId(productId: number) {
    return this.httpClient.get<Product>(
      "http://localhost:51110/api/products/GetProductById/" + productId,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + localStorage.getItem("access_token")
        })
      }
    );
  }

  addUpdateProduct(product: Product): Observable<string> {
    return this.httpClient.post<string>(
      "http://localhost:51110/api/products/AddUpdateProduct",
      product,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + localStorage.getItem("access_token")
        })
      }
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      "http://localhost:51110/api/products/GetAllProducts",
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + localStorage.getItem("access_token")
        })
      }
    );
  }

  deleteProduct(id: number): Observable<string> {
    return this.httpClient.delete<string>(
      "http://localhost:51110/api/products/DeleteProduct/" + id,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + localStorage.getItem("access_token")
        })
      }
    );
  }

  // Sales

  // Purchase Order

  getAllPurchaseOrders(): Observable<PurchaseOrder[]> {
    return this.httpClient.get<PurchaseOrder[]>(
      "http://localhost:51110/api/purchaseOrders/GetAllProductOrders",
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + localStorage.getItem("access_token")
        })
      }
    );
  }

  deletePurchaseOrder(id: number): Observable<string> {
    return this.httpClient.delete<string>(
      "http://localhost:51110/api/purchaseOrders/DeleteProductOrder/" + id,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + localStorage.getItem("access_token")
        })
      }
    );
  }

  getSavedCategories(mainCategoryId: number, categoryId: number, subCategoryId: number): Observable<any> {
    const response1 = this.httpClient.get('http://localhost:51110/api/categories/GetAllCategoriesByMainCategoryId/' + mainCategoryId);
    const response2 = this.httpClient.get('http://localhost:51110/api/SubCategories/GetSubCategoriesByCategoryId/' + categoryId);
    const response3 = this.httpClient.get('http://localhost:51110/api/ForthSubCategories/GetForthSubCategoriesbySubCategoryid/' + subCategoryId);
    return forkJoin([response1, response2, response3]);
  }

  addPurchaseOrder(purchaseOrder: PurchaseOrder): Observable<any> {
    return this.httpClient.post<PurchaseOrder>(
      "http://localhost:51110/api/purchaseOrders/AddUpdatePurchaseOrder",
      purchaseOrder,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + localStorage.getItem("access_token")
        })
      }
    );
  }


  // Invoice Starts
  addInvoice(order: SaleOrder): Observable<string> {
    return this.httpClient.post<string>(
      "http://localhost:51110/api/invoices/AddUpdateInvoice",
      order,
      {
        headers: new HttpHeaders({
          Authorization: "Bearer " + localStorage.getItem("access_token")
        })
      }
    );
  }
}
