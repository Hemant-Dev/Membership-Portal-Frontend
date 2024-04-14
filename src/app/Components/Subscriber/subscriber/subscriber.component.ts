import { Component, OnInit } from '@angular/core';
import { SubscriberListComponent } from '../subscriber-list/subscriber-list.component';
import { Subscriber } from '../../../Models/subscriber';
import { SubscriberService } from '../../../Services/subscriber.service';
import { TableHeaderData } from '../../../Models/table-header-data';
import { GenericListComponent } from '../../generic-list/generic-list.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  constructor(
    private _subscriberService: SubscriberService,
    private _toastr: ToastrService,
    private _route: Router
  ) {}
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

  handleEditSubscriber(subscriberId: number) {
    this._route.navigate(['/subscriber-form', subscriberId]);
  }
  handleDeleteSubscriber(subscriberId: number) {
    if (confirm('Are you sure you want to delete this subscriber?')) {
      this._subscriberService.deleteSubscriberData(subscriberId).subscribe({
        next: (res) => {
          // console.log(res);
          this.getAllSubscriberDataOnInit();
          this.showSuccess();
        },
        error: (err) => console.log(err),
      });
    }
  }

  showSuccess() {
    this._toastr.success('Data Deleted Successfully!', 'Deletion');
  }
}
