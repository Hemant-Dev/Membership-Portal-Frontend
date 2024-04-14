import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Discount } from '../../../Models/discount';
import { ToastrService } from 'ngx-toastr';
import { DiscountService } from '../../../Services/discount.service';
import { ValidationService } from '../../../Services/validation.service';

@Component({
  selector: 'app-discount-form',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './discount-form.component.html',
  styleUrl: './discount-form.component.css',
})
export class DiscountFormComponent implements OnInit {
  initialDiscountObj: Discount = {
    id: 0,
    discountCode: '',
    discountAmount: 0,
    isDiscountInPercentage: false,
  };
  idParam!: number;
  errorMessages: string[] = [];

  isDiscountCodeValid = true;
  isDiscountAmountValid = true;

  constructor(
    private _discountService: DiscountService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService,
    private _validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.idParam = Number(this._route.snapshot.paramMap.get('id'));
    this.initialDiscountObj.id = this.idParam;
    this.handleUpdateForm();
    this.errorMessages = [];
  }

  handleSubmit() {
    // alert(JSON.stringify(this.initialProductObj));
    if (this._validationService.validateDiscountForm(this.initialDiscountObj)) {
      // It is Valid Form
      if (this.initialDiscountObj.id === 0) {
        // Add Form
        this._discountService
          .addDiscountData(this.initialDiscountObj)
          .subscribe({
            next: (res) => {
              // console.log(res);
              this._router.navigate(['/discount']);
              this.showCreationSuccess();
            },
            error: (err) => console.log(err),
          });
      } else {
        // Update Form
        this._discountService
          .updateDiscountData(this.idParam, this.initialDiscountObj)
          .subscribe({
            next: (res) => {
              // console.log(res);
              this._router.navigate(['/discount']);
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
    if (this.initialDiscountObj.id !== 0) {
      this._discountService
        .getDiscountDataById(this.initialDiscountObj.id)
        .subscribe({
          next: (data) => {
            this.initialDiscountObj = data;
            // console.log(data);
          },
        });
    } else {
      // console.log('Some Error Occured in User Form');
    }
  }

  showCreationSuccess() {
    this._toastr.success('Discount Added Successfully!', 'Creation');
  }
  showUpdationSuccess() {
    this._toastr.success('Discount Updated Successfully!', 'Updation');
  }
  showError() {
    this._toastr.error('Discount Form is invalid!.', 'Error');
  }

  markInvalidInputs(errorMessages: string[]) {
    this.isDiscountCodeValid = !errorMessages.some((error) =>
      error.includes('Discount Code')
    );
    this.isDiscountAmountValid = !errorMessages.some((error) =>
      error.includes('Discount Amount')
    );
  }
}
