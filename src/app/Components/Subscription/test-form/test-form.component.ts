import { Component } from '@angular/core';
import { CreateSubscription } from '../../../Models/create-subscription';
import { Subscriber } from '../../../Models/subscriber';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubscriberService } from '../../../Services/subscriber.service';
import { SubscriptionService } from '../../../Services/subscription.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../Models/product';
import { ProductService } from '../../../Services/product.service';
import { DiscountService } from '../../../Services/discount.service';
import { Discount } from '../../../Models/discount';
import { Tax } from '../../../Models/tax';
import { TaxService } from '../../../Services/tax.service';

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.css',
})
export class TestFormComponent {
  createSubscriptionObj: CreateSubscription = {
    id: 0,
    subscriberId: 0,
    productId: 0,
    discountId: 0,
    taxId: 0,
    startDate: new Date(0, 0, 0),
    expiryDate: new Date(0, 0, 0),
  };

  idParam!: number;
  errorMessages: string[] = [];
  subscriberList: Subscriber[] = [];
  productList: Product[] = [];
  discountList: Discount[] = [];
  taxList: Tax[] = [];
  constructor(
    private _subscriptionService: SubscriptionService,
    private _route: ActivatedRoute,
    private _router: Router,
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
    this.getAllTaxData();
    this.idParam = Number(this._route.snapshot.paramMap.get('id'));
    this.createSubscriptionObj.id = this.idParam;
    this.errorMessages = [];
    this.handleUpdateForm();
  }

  handleUpdateForm() {
    if (this.idParam !== 0) {
      this._subscriptionService
        .getSubscriptionDataById(this.idParam)
        .subscribe({
          next: (data) => {
            this.createSubscriptionObj.subscriberId = data.subscriberId;
            this.createSubscriptionObj.productId = data.productId;
            this.createSubscriptionObj.discountId = data.discountId;
            this.createSubscriptionObj.taxId = data.taxId;
            this.createSubscriptionObj.startDate = data.startDate;
            this.createSubscriptionObj.expiryDate = data.expiryDate;
          },
          error: (err) => console.log(err),
        });
    }
  }

  getAllSubscriberData() {
    this._subscriberService.getAllSubscriberData().subscribe({
      next: (data) => {
        this.subscriberList = data;
      },
      error: (err) => console.log(err),
    });
  }
  getAllProductData() {
    this._productService.getAllProductData().subscribe({
      next: (data) => {
        this.productList = data;
      },
      error: (err) => console.log(err),
    });
  }
  getAllDiscountData() {
    this._discountService.getAllDiscountData().subscribe({
      next: (data) => {
        this.discountList = data;
      },
      error: (err) => console.log(err),
    });
  }
  getAllTaxData() {
    this._taxService.getAllTaxData().subscribe({
      next: (data) => {
        this.taxList = data;
      },
      error: (err) => console.log(err),
    });
  }

  handleSubmit() {
    alert(JSON.stringify(this.createSubscriptionObj));
  }
}
