export interface Tax {
  id: number;
  sgst: number | null;
  cgst: number | null;
  totalTax: number | null;
}
