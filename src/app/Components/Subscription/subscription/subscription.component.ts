import { Component, OnInit } from '@angular/core';
import { TableHeaderData } from '../../../Models/table-header-data';
import { SubscriptionService } from '../../../Services/subscription.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GenericListComponent } from '../../generic-list/generic-list.component';
import { SubscriberListComponent } from '../../Subscriber/subscriber-list/subscriber-list.component';
import { SubscriptionListComponent } from '../subscription-list/subscription-list.component';
import { Subscription } from '../../../Models/subscription';
import { FormsModule } from '@angular/forms';
import { Discount } from '../../../Models/discount';
import { Product } from '../../../Models/product';
import { Tax } from '../../../Models/tax';
import { Subscriber } from '../../../Models/subscriber';
import { SubscriberService } from '../../../Services/subscriber.service';
import { ProductService } from '../../../Services/product.service';
import { DiscountService } from '../../../Services/discount.service';
import { TaxService } from '../../../Services/tax.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-subscription',
  standalone: true,
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css',
  imports: [
    GenericListComponent,
    SubscriberListComponent,
    SubscriptionListComponent,
    FormsModule,
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
  date: DatePipe = new DatePipe('en-US');
  sortOrder: string | null = null;
  sortColumn: string | null = null;
  page = 1;
  pageSize = 5;
  totalPages: number = 0;
  isInSearchMode: boolean = false;
  currentDate = new Date();
  formattedDate = new Date(
    this.currentDate.getFullYear(),
    this.currentDate.getMonth(),
    this.currentDate.getDate()
  );

  initialSubscriptionObj: Subscription = {
    id: 0,
    subscriberId: 0,
    productId: 0,
    productName: '',
    productPrice: 0,
    discountId: 0,
    discountCode: '',
    discountAmount: 0,
    priceAfterDiscount: 0,
    taxId: 0,
    cgst: 0,
    sgst: 0,
    totalTaxPercentage: 0,
    taxAmount: 0,
    finalAmount: 0,
    startDate: null,
    expiryDate: null,
  };

  subscriberList: Subscriber[] = [];
  productList: Product[] = [];
  discountList: Discount[] = [];
  taxList: Tax[] = [];

  constructor(
    private _subscriptionService: SubscriptionService,
    private _toastr: ToastrService,
    private _route: Router,
    private _subscriberService: SubscriberService,
    private _productService: ProductService,
    private _discountService: DiscountService,
    private _taxService: TaxService
  ) {}
  ngOnInit(): void {
    this.getAllSubscriberData();
    this.getAllProductData();
    this.getAllDiscountData();
    // this.getAllTaxData();
    this.getAllSubscriptionDataOnInit();
  }

  getAllSubscriptionDataOnInit() {
    this._subscriptionService
      .getPaginatedAdvanceSubscriptionData(
        this.sortColumn,
        this.sortOrder,
        this.page,
        this.pageSize,
        this.initialSubscriptionObj
      )
      .subscribe({
        next: (data) => {
          this.subscriptionsList = data.dataArray;
          this.totalPages = data.totalPages;
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

  handleSubmit() {
    // console.log(this.initialProductObj);

    this.isInSearchMode = true;
    // console.log('Before:', this.productList);
    this.getAllSubscriptionDataOnInit();
    // console.log('After:', this.productList);
  }

  handlePreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.getAllSubscriptionDataOnInit();
    } else {
      this.showError();
    }
  }

  handleNextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getAllSubscriptionDataOnInit();
    } else {
      this.showError();
    }
  }

  showSuccess() {
    this._toastr.success('Data Deleted Successfully!', 'Deletion');
  }
  showError() {
    this._toastr.error('Page does not exist!', 'Pagination');
  }

  getAllSubscriberData() {
    this._subscriberService.getAllSubscriberData(null, null).subscribe({
      next: (data) => {
        this.subscriberList = data;
      },
      error: (err) => console.log(err),
    });
  }
  getAllProductData() {
    this._productService.getAllProductData(null, null).subscribe({
      next: (data) => {
        this.productList = data;
      },
      error: (err) => console.log(err),
    });
  }
  getAllDiscountData() {
    this._discountService.getAllDiscountData(null, null).subscribe({
      next: (data) => {
        this.discountList = data;
      },
      error: (err) => console.log(err),
    });
  }
  getAllTaxData() {
    this._taxService.getAllTaxData(null, null).subscribe({
      next: (data) => {
        this.taxList = data;
      },
      error: (err) => console.log(err),
    });
  }
}
