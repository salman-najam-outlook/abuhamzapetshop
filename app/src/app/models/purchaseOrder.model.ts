import { SingleProduct } from './singleProduct.model';

export class PurchaseOrder {
  totalAmount: number = 0;
  paidAmount: number = 0;
  description: string = '';
  supplier: string = '';
  creditorAcc_Id: number = 0;
  orderDetails: SingleProduct[]
}
