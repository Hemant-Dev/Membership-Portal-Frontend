export interface Tax {
  id: number;
  taxName: string;
  sgst: number | null;
  cgst: number | null;
  totalTax: number | null;
}
