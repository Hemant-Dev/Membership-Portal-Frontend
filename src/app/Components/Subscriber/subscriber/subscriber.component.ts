import { Component, OnInit } from '@angular/core';
import { SubscriberListComponent } from '../subscriber-list/subscriber-list.component';
import { Subscriber } from '../../../Models/subscriber';
import { SubscriberService } from '../../../Services/subscriber.service';
import { TableHeaderData } from '../../../Models/table-header-data';
import { GenericListComponent } from '../../generic-list/generic-list.component';

@Component({
  selector: 'app-subscriber',
  standalone: true,
  templateUrl: './subscriber.component.html',
  styleUrl: './subscriber.component.css',
  imports: [SubscriberListComponent, GenericListComponent],
})
export class SubscriberComponent implements OnInit {
  subscribersList: any[] = [];
  subscriberKeys: TableHeaderData[] = [
    {
      HeaderName: 'First Name',
      FieldName: 'firstName',
    },
    {
      HeaderName: 'Last Name',
      FieldName: 'lastName',
    },
    {
      HeaderName: 'Email',
      FieldName: 'email',
    },
    {
      HeaderName: 'Contact No.',
      FieldName: 'contactNumber',
    },
    {
      HeaderName: 'Gender',
      FieldName: 'genderName',
    },
  ];
  Title: string = 'Subscriber';
  AddFormRouteName: string = 'subscriber-form';
  constructor(private _subscriberService: SubscriberService) {}
  ngOnInit(): void {
    this.getAllSubscriberDataOnInit();
  }

  getAllSubscriberDataOnInit() {
    this._subscriberService.getAllSubscriberData().subscribe({
      next: (data) => {
        this.subscribersList = data;
        // console.log(data);
      },
      error: (err) => console.log(err),
    });
  }
}
