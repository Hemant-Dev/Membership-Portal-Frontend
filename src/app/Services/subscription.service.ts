import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSubscription } from '../Models/create-subscription';
import { Subscription } from '../Models/subscription';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private _http: HttpClient) {}
  private subscriptionAPIUrl = 'http://localhost:5224/api/subscription';

  getAllSubscriptionData(): Observable<Subscription[]> {
    return this._http.get<Subscription[]>(this.subscriptionAPIUrl);
  }

  getSubscriptionDataById(subscriptionId: number): Observable<Subscription> {
    return this._http.get<Subscription>(
      this.subscriptionAPIUrl + `/${subscriptionId}`
    );
  }
  addSubscriptionData(
    subscriptionObj: CreateSubscription
  ): Observable<Subscription> {
    return this._http.post<Subscription>(
      this.subscriptionAPIUrl,
      subscriptionObj
    );
  }
  updateSubscriptionData(
    subscriptionId: number,
    subscriptionObj: CreateSubscription
  ): Observable<Subscription> {
    return this._http.put<Subscription>(
      this.subscriptionAPIUrl + `/${subscriptionId}`,
      subscriptionObj
    );
  }
  deleteSubscriptionData(subscriptionId: number): Observable<boolean> {
    return this._http.delete<boolean>(
      this.subscriptionAPIUrl + `/${subscriptionId}`
    );
  }
}
