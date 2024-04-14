import { Component, OnInit } from '@angular/core';
import { Gender } from '../../../Models/gender';
import { GenderService } from '../../../Services/gender.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../Services/validation.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gender-form',
  standalone: true,
  imports: [RouterModule, NgIf, FormsModule],
  templateUrl: './gender-form.component.html',
  styleUrl: './gender-form.component.css',
})
export class GenderFormComponent implements OnInit {
  initialGenderObj: Gender = {
    id: 0,
    genderName: '',
  };
  idParam!: number;
  errorMessages: string[] = [];

  isGenderNameValid = true;

  constructor(
    private _genderService: GenderService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService,
    private _validationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.idParam = Number(this._route.snapshot.paramMap.get('id'));
    this.initialGenderObj.id = this.idParam;
    this.handleUpdateForm();
    this.errorMessages = [];
  }

  handleSubmit() {
    // alert(JSON.stringify(this.initialProductObj));
    if (this._validationService.validateGenderForm(this.initialGenderObj)) {
      // It is Valid Form
      if (this.initialGenderObj.id === 0) {
        // Add Form
        this._genderService.addGenderData(this.initialGenderObj).subscribe({
          next: (res) => {
            // console.log(res);
            this._router.navigate(['/gender']);
            this.showCreationSuccess();
          },
          error: (err) => console.log(err),
        });
      } else {
        // Update Form
        this._genderService
          .updateGenderData(this.idParam, this.initialGenderObj)
          .subscribe({
            next: (res) => {
              // console.log(res);
              this._router.navigate(['/gender']);
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
    if (this.initialGenderObj.id !== 0) {
      this._genderService
        .getGenderDataById(this.initialGenderObj.id)
        .subscribe({
          next: (data) => {
            this.initialGenderObj = data;
            // console.log(data);
          },
        });
    } else {
      // console.log('Some Error Occured in User Form');
    }
  }

  showCreationSuccess() {
    this._toastr.success('Gender Added Successfully!', 'Creation');
  }
  showUpdationSuccess() {
    this._toastr.success('Gender Updated Successfully!', 'Updation');
  }
  showError() {
    this._toastr.error('Gender Form is invalid!.', 'Error');
  }

  markInvalidInputs(errorMessages: string[]) {
    this.isGenderNameValid = !errorMessages.some((error) =>
      error.includes('Gender Name')
    );
  }
}
