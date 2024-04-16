import { Component, OnInit } from '@angular/core';
import { TableHeaderData } from '../../../Models/table-header-data';
import { SubscriptionService } from '../../../Services/subscription.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GenericListComponent } from '../../generic-list/generic-list.component';
import { SubscriberListComponent } from '../../Subscriber/subscriber-list/subscriber-list.component';
import { SubscriptionListComponent } from '../subscription-list/subscription-list.component';

@Component({
  selector: 'app-subscription',
  standalone: true,
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css',
  imports: [
    GenericListComponent,
    SubscriberListComponent,
    SubscriptionListComponent,
  ],
})
export class SubscriptionComponent implements OnInit {
  subscriptionsList: any[] = [];
  subscriptionKeys: TableHeaderData[] = [
    {
      HeaderName: 'Subscriber Name',
      FieldName: 'subscriberId',
    },
    {
      HeaderName: 'Product Name',
      FieldName: 'productName',
    },
    {
      HeaderName: 'Product Price',
      FieldName: 'productPrice',
    },
    {
      HeaderName: 'Discount Code',
      FieldName: 'discountCode',
    },
    {
      HeaderName: 'Discount Amount',
      FieldName: 'discountAmount',
    },
    {
      HeaderName: 'Price After Discount',
      FieldName: 'priceAfterDiscount',
    },
    {
      HeaderName: 'CGST',
      FieldName: 'cgst',
    },
    {
      HeaderName: 'SGST',
      FieldName: 'sgst',
    },
    {
      HeaderName: 'Total Tax %',
      FieldName: 'totalTaxPercentage',
    },
    {
      HeaderName: 'Tax Amount',
      FieldName: 'taxAmount',
    },
    {
      HeaderName: 'Final Amount',
      FieldName: 'finalAmount',
    },
    {
      HeaderName: 'Start Date',
      FieldName: 'startDate',
    },
    {
      HeaderName: 'Expiry Date',
      FieldName: 'expiryDate',
    },
  ];
  Title: string = 'Subscription';
  AddFormRouteName: string = 'subscription-form';

  constructor(
    private _subscriptionService: SubscriptionService,
    private _toastr: ToastrService,
    private _route: Router
  ) {}
  ngOnInit(): void {
    this.getAllSubscriptionDataOnInit();
  }

  getAllSubscriptionDataOnInit() {
    this._subscriptionService.getAllSubscriptionData().subscribe({
      next: (data) => {
        this.subscriptionsList = data;
        // console.log(data);
      },
      error: (err) => console.log(err),
    });
  }

  handleEditSubscription(subscriptionId: number) {
    this._route.navigate(['/subscription-form', subscriptionId]);
  }
  handleDeleteSubscription(subscriptionId: number) {
    if (confirm('Are you sure you want to delete this subscription?')) {
      this._subscriptionService
        .deleteSubscriptionData(subscriptionId)
        .subscribe({
          next: (res) => {
            // console.log(res);
            this.getAllSubscriptionDataOnInit();
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
