import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }
  private userAPIUrl = 'http://localhost:5224/api/user';
  
  getAllUserData() : Observable<User[]> {
    return this._http.get<User[]>(this.userAPIUrl);
  }


}
