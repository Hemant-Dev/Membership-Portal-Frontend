export interface Discount {
  id: number;
  discountCode: string;
  discountAmount: number | null;
  isDiscountInPercentage: boolean;
}
