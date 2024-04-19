import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { Subscriber } from '../Models/subscriber';
import { CreateSubscriber } from '../Models/create-subscriber';
import { Paginated } from '../Models/paginated';

@Injectable({
  providedIn: 'root',
})
export class SubscriberService {
  constructor(private _http: HttpClient) {}
  private subscriberAPIUrl = 'http://localhost:5224/api/subscriber';

  getAllSubscriberData(
    sortColumn: string | null,
    sortOrder: string | null
  ): Observable<Subscriber[]> {
    return this._http.get<Subscriber[]>(
      this.subscriberAPIUrl + `?sortColumn=${sortColumn}&sortOrder=${sortOrder}`
    );
  }

  getPaginatedAdvanceUserData(
    sortColumn: string | null = null,
    sortOrder: string | null = null,
    page: number,
    pageSize: number,
    subscriber: Subscriber
  ): Observable<Paginated<Subscriber>> {
    return this._http.post<Paginated<Subscriber>>(
      this.subscriberAPIUrl +
        `/paginated?sortColumn=${sortColumn}&sortOrder=${sortOrder}&page=${page}&pageSize=${pageSize}`,
      subscriber
    );
  }

  getSubscriberDataById(subscriberId: number): Observable<Subscriber> {
    return this._http.get<Subscriber>(
      this.subscriberAPIUrl + `/${subscriberId}`
    );
  }
  addSubscriberData(
    subscriberObj: CreateSubscriber
  ): Observable<CreateSubscriber> {
    return this._http.post<CreateSubscriber>(
      this.subscriberAPIUrl,
      subscriberObj
    );
  }
  updateSubscriberData(
    subscriberId: number,
    subscriberObj: CreateSubscriber
  ): Observable<CreateSubscriber> {
    return this._http.put<CreateSubscriber>(
      this.subscriberAPIUrl + `/${subscriberId}`,
      subscriberObj
    );
  }
  deleteSubscriberData(subscriberId: number): Observable<boolean> {
    return this._http.delete<boolean>(
      this.subscriberAPIUrl + `/${subscriberId}`
    );
  }
}
