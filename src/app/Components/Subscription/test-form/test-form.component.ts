import { Component } from '@angular/core';
import { CreateSubscription } from '../../../Models/create-subscription';
import { Subscriber } from '../../../Models/subscriber';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SubscriberService } from '../../../Services/subscriber.service';
import { SubscriptionService } from '../../../Services/subscription.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../Models/product';
import { ProductService } from '../../../Services/product.service';
import { DiscountService } from '../../../Services/discount.service';
import { Discount } from '../../../Models/discount';
import { Tax } from '../../../Models/tax';
import { TaxService } from '../../../Services/tax.service';
import { ValidationService } from '../../../Services/validation.service';
import { Subscription } from '../../../Models/subscription';

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.css',
  providers: [DatePipe],
})
export class TestFormComponent {
  createSubscriptionObj: CreateSubscription = {
    id: 0,
    subscriberId: 0,
    productId: 0,
    discountId: 0,
    taxId: 0,
    startDate: new Date(0, 0, 1),
    expiryDate: new Date(0, 0, 1),
  };

  intermediateCalculation: Subscription = {
    id: 0,
    subscriberId: 0,
    productId: 0,
    productName: '',
    productPrice: null,
    discountId: 0,
    discountCode: '',
    discountAmount: null,
    priceAfterDiscount: null,
    taxId: 0,
    cgst: null,
    sgst: null,
    totalTaxPercentage: null,
    taxAmount: null,
    finalAmount: null,
    startDate: new Date(0, 0, 0),
    expiryDate: new Date(0, 0, 0),
  };

  //Invalid Inputs Marking
  isSubscriberIdValid = true;
  isProductIdValid = true;
  isDiscountIdValid = true;
  isTaxIdValid = true;
  isStartDateValid = true;
  isExpiryDateValid = true;

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
    private _taxService: TaxService,
    private _validationService: ValidationService
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
            this.intermediateCalculation.productPrice = data.productPrice;
            this.createSubscriptionObj.discountId = data.discountId;
            this.intermediateCalculation.discountAmount = data.discountAmount;
            this.intermediateCalculation.priceAfterDiscount =
              data.priceAfterDiscount;
            // this.createSubscriptionObj.taxId = data.taxId;
            this.intermediateCalculation.cgst = data.cgst;
            this.intermediateCalculation.sgst = data.sgst;
            this.intermediateCalculation.totalTaxPercentage =
              data.totalTaxPercentage;
            this.intermediateCalculation.taxAmount = data.taxAmount;
            this.intermediateCalculation.finalAmount = data.finalAmount;
            this.createSubscriptionObj.startDate = data.startDate;
            this.createSubscriptionObj.expiryDate = data.expiryDate;
            this.intermediateCalculation = data;
          },
          error: (err) => console.log(err),
        });
    }
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
  handleProductChange(productId: number | null) {
    const selectedProductId = Number(productId);

    if (typeof selectedProductId === 'number') {
      this._productService.getProductDataById(selectedProductId).subscribe({
        next: (data) => {
          // debugger;
          this.intermediateCalculation.productPrice = data.price;
          this.intermediateCalculation.priceAfterDiscount =
            this.intermediateCalculation.productPrice;
          if (
            this.intermediateCalculation.productId !== 0 &&
            this.intermediateCalculation.productId !== null
          ) {
            if (
              this.intermediateCalculation.discountId !== 0 &&
              this.intermediateCalculation.discountId !== null
            ) {
              this.handleDiscountChange(this.intermediateCalculation.productId);
            }
            if (
              this.intermediateCalculation.totalTaxPercentage !== 0 &&
              this.intermediateCalculation.totalTaxPercentage !== null
            ) {
              var taxAmount =
                (Number(this.intermediateCalculation.priceAfterDiscount) *
                  Number(this.intermediateCalculation.totalTaxPercentage)) /
                100;
              this.intermediateCalculation.taxAmount = taxAmount;
              this.intermediateCalculation.finalAmount =
                Number(this.intermediateCalculation.priceAfterDiscount) +
                taxAmount;
            }
          }
        },
        error: (err) => console.log(err),
      });
    } else {
      console.error('productId is not a number.');
    }
  }

  handleDiscountChange(discountId: number | null) {
    const selectedDiscountId = Number(discountId);

    if (typeof selectedDiscountId === 'number') {
      this._discountService.getDiscountDataById(selectedDiscountId).subscribe({
        next: (data) => {
          // this.discountObj = data;
          // this.intermediateCalculation.discountAmount = data.discountAmount;
          var discountAmount = 0;
          if (data.isDiscountInPercentage) {
            discountAmount =
              (Number(this.intermediateCalculation.productPrice) *
                Number(data.discountAmount)) /
              100;
            // console.log('Discount Amount in percentage: ', discountAmount);
          } else {
            discountAmount = Number(data.discountAmount);
            // console.log('Discount Amount : ', discountAmount);
          }
          this.intermediateCalculation.discountAmount = discountAmount;
          this.intermediateCalculation.priceAfterDiscount =
            Number(this.intermediateCalculation.productPrice) -
            Number(this.intermediateCalculation.discountAmount);
          if (
            this.intermediateCalculation.totalTaxPercentage !== 0 ||
            this.intermediateCalculation.totalTaxPercentage !== null
          ) {
            var taxAmount =
              (Number(this.intermediateCalculation.priceAfterDiscount) *
                Number(this.intermediateCalculation.totalTaxPercentage)) /
              100;
            this.intermediateCalculation.taxAmount = taxAmount;
            this.intermediateCalculation.finalAmount =
              Number(this.intermediateCalculation.priceAfterDiscount) +
              taxAmount;
          }
        },
        error: (err) => console.log(err),
      });
    } else {
      console.log('DiscountId is not a number.');
    }
  }

  handleTaxChange(taxId: number | null) {
    const selectedTaxId = Number(taxId);

    if (typeof selectedTaxId === 'number') {
      this._taxService.getTaxDataById(selectedTaxId).subscribe({
        next: (data) => {
          // this.taxObj = data;
          this.intermediateCalculation.cgst = data.cgst;
          this.intermediateCalculation.sgst = data.sgst;
          this.intermediateCalculation.totalTaxPercentage = data.totalTax;
          var taxAmount =
            (Number(this.intermediateCalculation.priceAfterDiscount) *
              Number(this.intermediateCalculation.totalTaxPercentage)) /
            100;
          this.intermediateCalculation.taxAmount = taxAmount;
          this.intermediateCalculation.finalAmount =
            Number(this.intermediateCalculation.priceAfterDiscount) + taxAmount;
        },
        error: (err) => console.log(err),
      });
    } else {
      console.log('TaxId is not a number.');
    }
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
