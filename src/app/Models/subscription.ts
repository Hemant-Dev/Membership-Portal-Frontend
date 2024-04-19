export interface Subscription {
  id: number;
  subscriberId: number;
  productId: number;
  productName: string;
  productPrice: number | null;
  discountId: number;
  discountCode: string;
  discountAmount: number | null;
  priceAfterDiscount: number | null;
  taxId: number;
  cgst: number | null;
  sgst: number | null;
  totalTaxPercentage: number | null;
  taxAmount: number | null;
  finalAmount: number | null;
  startDate: any;
  expiryDate: any;
}
