import { Injectable } from '@angular/core';
import { Product } from '../Models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Paginated } from '../Models/paginated';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  private productAPIUrl = 'http://localhost:5224/api/product';

  getAllProductData(
    sortColumn: string | null,
    sortOrder: string | null
  ): Observable<Product[]> {
    return this._http.get<Product[]>(
      this.productAPIUrl + `?sortColumn=${sortColumn}&sortOrder=${sortOrder}`
    );
  }

  getPaginatedAdvanceProductData(
    sortColumn: string | null = null,
    sortOrder: string | null = null,
    page: number,
    pageSize: number,
    product: Product
  ): Observable<Paginated<Product>> {
    return this._http.post<Paginated<Product>>(
      this.productAPIUrl +
        `/paginated?sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`,
      product
    );
  }
  getProductDataById(productId: number): Observable<Product> {
    return this._http.get<Product>(this.productAPIUrl + `/${productId}`);
  }
  addProductData(productObj: Product): Observable<Product> {
    return this._http.post<Product>(this.productAPIUrl, productObj);
  }
  updateProductData(
    productId: number,
    productObj: Product
  ): Observable<Product> {
    return this._http.put<Product>(
      this.productAPIUrl + `/${productId}`,
      productObj
    );
  }
  deleteProductData(productId: number): Observable<boolean> {
    return this._http.delete<boolean>(this.productAPIUrl + `/${productId}`);
  }
}
