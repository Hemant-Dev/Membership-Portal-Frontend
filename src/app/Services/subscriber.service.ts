import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { Subscriber } from '../Models/subscriber';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private _http: HttpClient) { }
  private subscriberAPIUrl = 'http://localhost:5224/api/subscriber';
  
  getAllSubscriberData() : Observable<Subscriber[]> {
    return this._http.get<Subscriber[]>(this.subscriberAPIUrl);
  }

  getSubscriberDataById(subscriberId: number) : Observable<Subscriber> {
    return this._http.get<Subscriber>(this.subscriberAPIUrl + `/${subscriberId}`);
  }
  addSubscriberData(subscriberObj: Subscriber) : Observable<Subscriber> {
    return this._http.post<Subscriber>(this.subscriberAPIUrl, subscriberObj);
  }
  updateSubscriberData(subscriberId: number, subscriberObj: Subscriber) : Observable<Subscriber> {
    return this._http.put<Subscriber>(this.subscriberAPIUrl+`/${subscriberId}`, subscriberObj);
  }
  deleteSubscriberData(subscriberId: number) : Observable<boolean> {
    return this._http.delete<boolean>(this.subscriberAPIUrl + `/${subscriberId}`);
  }
}
