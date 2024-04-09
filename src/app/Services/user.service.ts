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

  getUserDataById(userId: number) : Observable<User> {
    return this._http.get<User>(this.userAPIUrl + `/${userId}`);
  }
  addUserData(userObj: User) : Observable<User> {
    return this._http.post<User>(this.userAPIUrl, userObj);
  }
  updateUserData(userId: number, userObj: User) : Observable<User> {
    return this._http.put<User>(this.userAPIUrl+`/${userId}`, userObj);
  }
  deleteUserData(userId: number) : Observable<boolean> {
    return this._http.delete<boolean>(this.userAPIUrl + `/${userId}`);
  }
}
