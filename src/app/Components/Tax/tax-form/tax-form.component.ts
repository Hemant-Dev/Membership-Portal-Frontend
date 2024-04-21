import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Tax } from '../../../Models/tax';
import { TaxService } from '../../../Services/tax.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../Services/validation.service';

@Component({
  selector: 'app-tax-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tax-form.component.html',
  styleUrl: './tax-form.component.css',
})
export class TaxFormComponent {
  initialTaxObj: Tax = {
    id: 0,
    sgst: null,
    cgst: null,
    totalTax: null,
    taxName: '',
  };
  idParam!: number;
  errorMessages: string[] = [];

  isTaxNameValid = true;
  isSGSTValid = true;
  isCGSTValid = true;
  isTotalTaxValid = true;

  constructor(
    private _taxService: TaxService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService,
    private _validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.idParam = Number(this._route.snapshot.paramMap.get('id'));
    this.initialTaxObj.id = this.idParam;
    this.handleUpdateForm();
    this.errorMessages = [];
  }

  handleSubmit() {
    // alert(JSON.stringify(this.initialProductObj));
    if (this._validationService.validateTaxForm(this.initialTaxObj)) {
      // It is Valid Form
      if (this.initialTaxObj.id === 0) {
        // Add Form
        this._taxService.addTaxData(this.initialTaxObj).subscribe({
          next: (res) => {
            // console.log(res);
            this._router.navigate(['/tax']);
            this.showCreationSuccess();
          },
          error: (err) => console.log(err),
        });
      } else {
        // Update Form
        this._taxService
          .updateTaxData(this.idParam, this.initialTaxObj)
          .subscribe({
            next: (res) => {
              // console.log(res);
              this._router.navigate(['/tax']);
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
    if (this.initialTaxObj.id !== 0) {
      this._taxService.getTaxDataById(this.initialTaxObj.id).subscribe({
        next: (data) => {
          this.initialTaxObj = data;
          // console.log(data);
        },
      });
    } else {
      // console.log('Some Error Occured in User Form');
    }
  }

  showCreationSuccess() {
    this._toastr.success('Tax Added Successfully!', 'Creation');
  }
  showUpdationSuccess() {
    this._toastr.success('Tax Updated Successfully!', 'Updation');
  }
  showError() {
    this._toastr.error('Tax Form is invalid!.', 'Error');
  }

  markInvalidInputs(errorMessages: string[]) {
    this.isTaxNameValid = !errorMessages.some((error) =>
      error.includes('Tax Name')
    );
    this.isSGSTValid = !errorMessages.some((error) => error.includes('SGST'));
    this.isCGSTValid = !errorMessages.some((error) => error.includes('CGST'));
    this.isTotalTaxValid = !errorMessages.some((error) =>
      error.includes('Total Tax')
    );
  }

  handleTotalTaxChange() {
    if (this.initialTaxObj.sgst !== null && this.initialTaxObj.cgst === null) {
      this.initialTaxObj.totalTax = this.initialTaxObj.sgst + 0;
    } else if (
      this.initialTaxObj.sgst === null &&
      this.initialTaxObj.cgst !== null
    ) {
      this.initialTaxObj.totalTax = this.initialTaxObj.cgst + 0;
    } else if (
      this.initialTaxObj.cgst !== null &&
      this.initialTaxObj.sgst !== null
    ) {
      this.initialTaxObj.totalTax =
        this.initialTaxObj.sgst + this.initialTaxObj.cgst;
    } else {
      this.initialTaxObj.totalTax = null;
    }
  }
}
