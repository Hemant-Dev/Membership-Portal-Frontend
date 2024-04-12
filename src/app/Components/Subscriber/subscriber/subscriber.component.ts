import { Component, OnInit } from '@angular/core';
import { SubscriberListComponent } from "../subscriber-list/subscriber-list.component";
import { Subscriber } from '../../../Models/subscriber';
import { SubscriberService } from '../../../Services/subscriber.service';

@Component({
    selector: 'app-subscriber',
    standalone: true,
    templateUrl: './subscriber.component.html',
    styleUrl: './subscriber.component.css',
    imports: [SubscriberListComponent]
})
export class SubscriberComponent implements OnInit{
  subscribersList: Subscriber[] = [];
  Title: string = 'Subscriber';

  constructor(private _subscriberService: SubscriberService){

  }
  ngOnInit(): void {
    this.getAllSubscriberDataOnInit();
  }

  getAllSubscriberDataOnInit(){
    this._subscriberService.getAllSubscriberData().subscribe({
      next: (data) => {
        this.subscribersList = data;
        // console.log(data);
      },
      error: (err) => console.log(err),
    });
  }
}
