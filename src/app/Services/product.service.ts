import { Injectable } from '@angular/core';
import { Product } from '../Models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private _http: HttpClient){}

  private productAPIUrl = 'http://localhost:5224/api/product';

  getAllProductData() : Observable<Product[]> {
    return this._http.get<Product[]>(this.productAPIUrl);
  }
  getProductDataById(productId: number) : Observable<Product> {
    return this._http.get<Product>(this.productAPIUrl + `/${productId}`);
  }
  addProductData(productObj: Product) : Observable<Product> {
    return this._http.post<Product>(this.productAPIUrl, productObj);
  }
  updateProductData(productId: number, productObj: Product) : Observable<Product> {
    return this._http.put<Product>(this.productAPIUrl+`/${productId}`, productObj);
  }
  deleteProductData(productId: number) : Observable<boolean> {
    return this._http.delete<boolean>(this.productAPIUrl + `/${productId}`);
  }
}
