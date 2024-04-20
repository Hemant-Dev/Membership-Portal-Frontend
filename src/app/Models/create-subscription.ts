export interface CreateSubscription {
  id: number;
  subscriberId: number | null;
  productId: number | null;
  discountId: number | null;
  taxId: number | null;
  startDate: any;
  expiryDate: any;
}
