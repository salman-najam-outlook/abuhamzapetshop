import { SingleProduct } from "./singleProduct.model";

export class SaleOrder {
  subTotal: number = 0;
  tax: number = 0;
  discount: number = 0;
  grandTotal: number = 0;
  tenderAmount: number = 0;
  remainingCash: number = 0;
  singleProductList: SingleProduct[];
}
