import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gender } from '../Models/gender';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private _http: HttpClient) { }

  private genderAPIURL = 'http://localhost:5224/api/gender';

  getAllGenderData() : Observable<Gender[]> {
    return this._http.get<Gender[]>(this.genderAPIURL);
  }
  getGenderDataById(genderId: number) : Observable<Gender> {
    return this._http.get<Gender>(this.genderAPIURL + `/${genderId}`);
  }
  addGenderData(genderObj: Gender) : Observable<Gender> {
    return this._http.post<Gender>(this.genderAPIURL, genderObj);
  }
  updateGenderData(genderId: number, genderObj: Gender) : Observable<Gender> {
    return this._http.put<Gender>(this.genderAPIURL+`/${genderId}`, genderObj);
  }
  deleteGenderData(genderId: number) : Observable<boolean> {
    return this._http.delete<boolean>(this.genderAPIURL + `/${genderId}`);
  }
}
