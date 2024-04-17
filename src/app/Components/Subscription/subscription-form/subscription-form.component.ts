import { Component, OnInit } from '@angular/core';
import { CreateSubscription } from '../../../Models/create-subscription';
import { Subscriber } from '../../../Models/subscriber';
import { Product } from '../../../Models/product';
import { Discount } from '../../../Models/discount';
import { Tax } from '../../../Models/tax';
import { SubscriptionService } from '../../../Services/subscription.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../Services/validation.service';
import { SubscriberService } from '../../../Services/subscriber.service';
import { ProductService } from '../../../Services/product.service';
import { DiscountService } from '../../../Services/discount.service';
import { TaxService } from '../../../Services/tax.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.css',
  providers: [DatePipe],
})
export class SubscriptionFormComponent implements OnInit {
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

  //Invalid Inputs Marking
  isSubscriberIdValid = true;
  isProductIdValid = true;
  isDiscountIdValid = true;
  isTaxIdValid = true;
  isStartDateValid = true;
  isExpiryDateValid = true;

  // Var to identify when the form is in edit mode
  isInEditMode = false;
  formattedDate!: any;

  constructor(
    private _subscriptionService: SubscriptionService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService,
    private _validationService: ValidationService,
    private _subscriberService: SubscriberService,
    private _productService: ProductService,
    private _discountService: DiscountService,
    private _taxService: TaxService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // debugger;
    this.getAllDiscountData();
    this.getAllProductData();
    this.getAllSubscriberData();
    this.getAllTaxData();

    this.idParam = Number(this._route.snapshot.paramMap.get('id'));
    this.createSubscriptionObj.id = this.idParam;

    this.errorMessages = [];
    this.handleUpdateForm();
  }

  handleSubmit() {
    // alert(JSON.stringify(this.initialUserObj));
    if (
      this._validationService.validateCreateSubscriptionForm(
        this.createSubscriptionObj
      )
    ) {
      // It is Valid Form
      if (this.createSubscriptionObj.id === 0) {
        // Add Form
        this._subscriptionService
          .addSubscriptionData(this.createSubscriptionObj)
          .subscribe({
            next: (res) => {
              // console.log(res);
              this._router.navigate(['/subscription']);
              this.showCreationSuccess();
            },
            error: (err) => console.log(err),
          });
      } else {
        // Update Form

        this._subscriptionService
          .updateSubscriptionData(this.idParam, this.createSubscriptionObj)
          .subscribe({
            next: (res) => {
              // console.log(res);
              this._router.navigate(['/subscription']);
              this.showUpdationSuccess();
            },
            error: (err) => console.log(err),
          });
      }
    } else {
      // Not a valid form
      this.errorMessages = this._validationService.getErrorMessages();
      this.markInvalidInputs(this.errorMessages);
      this.showError();
    }
  }

  handleUpdateForm() {
    // debugger;
    if (this.createSubscriptionObj.id !== 0) {
      // this.getAllTaxData();
      this._subscriptionService
        .getSubscriptionDataById(this.createSubscriptionObj.id)
        .subscribe({
          next: (data) => {
            console.log(
              'Initial:' + JSON.stringify(this.createSubscriptionObj)
            );

            this.createSubscriptionObj.id = data.id;
            this.createSubscriptionObj.subscriberId = data.subscriberId;
            this.createSubscriptionObj.productId = data.productId;
            this.createSubscriptionObj.discountId = data.discountId;
            this.createSubscriptionObj.startDate = data.startDate;
            this.createSubscriptionObj.expiryDate = data.expiryDate;
            // this.initialSubscriptionObj = data;
            console.log('Response data: ' + JSON.stringify(data));
            console.log('After Setting: ', this.createSubscriptionObj);
          },
          error: (err) => console.log(err),
        });
    } else {
      // console.log('Some Error Occured in User Form');
    }
  }

  formatDate(date: Date): Date {
    if (date instanceof Date) {
      const day = date.getDate();
      console.log(day);
      const month = date.getMonth();
      const year = date.getFullYear();
      return new Date(year, month, day);
    }
    return new Date();
  }

  showCreationSuccess() {
    this._toastr.success('Subscription Added Successfully!', 'Creation');
  }
  showUpdationSuccess() {
    this._toastr.success('Subscription Updated Successfully!', 'Updation');
  }
  showError() {
    this._toastr.error('Subscription Form is invalid!.', 'Error');
  }

  markInvalidInputs(errorMessages: string[]) {
    this.isSubscriberIdValid = !errorMessages.some((error) =>
      error.includes('SubscriberId')
    );
    this.isProductIdValid = !errorMessages.some((error) =>
      error.includes('ProductId')
    );
    this.isDiscountIdValid = !errorMessages.some((error) =>
      error.includes('DiscountId')
    );
    this.isTaxIdValid = !errorMessages.some((error) => error.includes('TaxId'));
    this.isStartDateValid = !errorMessages.some((error) =>
      error.includes('Start Date')
    );
    this.isExpiryDateValid = !errorMessages.some((error) =>
      error.includes('Expiry Date')
    );
    if (
      errorMessages.some((error) =>
        error.includes('Expiry Date cannot be earlier than Start Date.')
      )
    ) {
      this.isStartDateValid = false;
      this.isExpiryDateValid = false;
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
    this._productService.getAllProductData(null, null).subscribe({
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
}
