import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from '../../../Models/subscription';
import { Router, RouterModule } from '@angular/router';
import { SubscriptionService } from '../../../Services/subscription.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, DatePipe } from '@angular/common';
import { Subscriber } from '../../../Models/subscriber';
import { Discount } from '../../../Models/discount';
import { Product } from '../../../Models/product';
import { Tax } from '../../../Models/tax';
import { DiscountService } from '../../../Services/discount.service';
import { ProductService } from '../../../Services/product.service';
import { SubscriberService } from '../../../Services/subscriber.service';
import { TaxService } from '../../../Services/tax.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscription-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './subscription-list.component.html',
  styleUrl: './subscription-list.component.css',
})
export class SubscriptionListComponent implements OnInit {
  @Input() subscriptionList!: Subscription[];

  sortOrder: string | null = null;
  sortColumn: string | null = null;
  page = 1;
  pageSize = 5;
  totalPages: number = 0;
  isInSearchMode: boolean = false;
  formatDate(dateString: string | number | Date) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear().toString().padStart(4, '0');
    return `${year}-${month}-${day}`;
  }

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
    startDate: '',
    expiryDate: '',
  };

  subscriberList: Subscriber[] = [];
  productList: Product[] = [];
  discountList: Discount[] = [];
  taxList: Tax[] = [];
  date: DatePipe = new DatePipe('en-US');
  constructor(
    private _router: Router,
    private _subscriptionService: SubscriptionService,
    private _toastr: ToastrService,
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
    // var formattedDate = this.date.transform(
    //   this.initialSubscriptionObj.startDate,
    //   'yyyy-MM-dd'
    // );
    // this.initialSubscriptionObj.startDate = formattedDate;
    // formattedDate = this.date.transform(
    //   this.initialSubscriptionObj.expiryDate,
    //   'yyyy-MM-dd'
    // );
    // this.initialSubscriptionObj.expiryDate = formattedDate;
    // console.log(this.initialSubscriptionObj);
    if (this.initialSubscriptionObj.startDate === '') {
      this.initialSubscriptionObj.startDate = this.formatDate('0001-01-01');
    }
    if (this.initialSubscriptionObj.expiryDate === '') {
      this.initialSubscriptionObj.expiryDate = this.formatDate('0001-01-01');
    }
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
          this.subscriptionList = data.dataArray;
          this.totalPages = data.totalPages;
          this.initialSubscriptionObj.startDate = '';
          this.initialSubscriptionObj.expiryDate = '';
          // console.log(data);
        },
        error: (err) => console.log(err),
      });
  }

  getAllSubscriptionData() {
    this._subscriptionService
      .getAllSubscriptionData(this.sortColumn, this.sortOrder)
      .subscribe({
        next: (data) => {
          this.subscriptionList = data;
        },
        error: (err) => console.log(err),
      });
  }
  handleEdit(subscriptionId: number) {
    this._router.navigate(['/test-form', subscriptionId]);
  }

  handleDelete(subscriptionId: number) {
    if (confirm('Are you sure you want to delete this Subscription?')) {
      this._subscriptionService
        .deleteSubscriptionData(subscriptionId)
        .subscribe({
          next: (res) => {
            // console.log(res);
            this.getAllSubscriptionDataOnInit();
            // info('Data Deleted Successfully!');
            this.showSuccess();
          },
          error: (err) => console.log(err),
        });
    }
  }

  handleSort(sortColumn: string) {
    this.sortColumn = sortColumn;
    this.sortOrder === 'asc'
      ? (this.sortOrder = 'desc')
      : (this.sortOrder = 'asc');
    this.getAllSubscriptionDataOnInit();
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

  handleClear() {
    // console.log('clear');
    this.initialSubscriptionObj = {
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
      startDate: '',
      expiryDate: '',
    };
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
