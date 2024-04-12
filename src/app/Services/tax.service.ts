import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tax } from '../Models/tax';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(private _http: HttpClient) { }

  private taxAPIURL = 'http://localhost:5224/api/tax';

  getAllTaxData() : Observable<Tax[]> {
    return this._http.get<Tax[]>(this.taxAPIURL);
  }
  getTaxDataById(taxId: number) : Observable<Tax> {
    return this._http.get<Tax>(this.taxAPIURL + `/${taxId}`);
  }
  addTaxData(taxObj: Tax) : Observable<Tax> {
    return this._http.post<Tax>(this.taxAPIURL, taxObj);
  }
  updateTaxData(taxId: number, taxObj: Tax) : Observable<Tax> {
    return this._http.put<Tax>(this.taxAPIURL+`/${taxId}`, taxObj);
  }
  deleteTaxData(taxId: number) : Observable<boolean> {
    return this._http.delete<boolean>(this.taxAPIURL + `/${taxId}`);
  }
}
