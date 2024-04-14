import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Discount } from '../Models/discount';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  constructor(private _http: HttpClient) {}

  private discountAPIURL = 'http://localhost:5224/api/discount';

  getAllDiscountData(): Observable<Discount[]> {
    return this._http.get<Discount[]>(this.discountAPIURL);
  }
  getDiscountDataById(discountId: number): Observable<Discount> {
    return this._http.get<Discount>(this.discountAPIURL + `/${discountId}`);
  }
  addDiscountData(discountObj: Discount): Observable<Discount> {
    return this._http.post<Discount>(this.discountAPIURL, discountObj);
  }
  updateDiscountData(
    discountId: number,
    discountObj: Discount
  ): Observable<Discount> {
    return this._http.put<Discount>(
      this.discountAPIURL + `/${discountId}`,
      discountObj
    );
  }
  deleteDiscountData(discountId: number): Observable<boolean> {
    return this._http.delete<boolean>(this.discountAPIURL + `/${discountId}`);
  }
}
