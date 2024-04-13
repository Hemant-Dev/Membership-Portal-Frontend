import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscriber } from '../../../Models/subscriber';
import { SubscriberService } from '../../../Services/subscriber.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ValidationService } from '../../../Services/validation.service';
import { GenderService } from '../../../Services/gender.service';
import { Gender } from '../../../Models/gender';
import { CreateSubscriber } from '../../../Models/create-subscriber';

@Component({
  selector: 'app-subscriber-form',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './subscriber-form.component.html',
  styleUrl: './subscriber-form.component.css',
})
export class SubscriberFormComponent implements OnInit {
  initialSubscriberObj: CreateSubscriber = {
    id: 0,
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    genderId: 0,
  };

  idParam!: number;
  errorMessages: string[] = [];
  genderList: Gender[] = [];

  //Invalid Inputs Marking
  isFirstNameValid = true;
  isLastNameValid = true;
  isEmailValid = true;
  isContactNumberValid = true;
  isGenderIdValid = true;

  constructor(
    private _subscriberService: SubscriberService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService,
    private _validationService: ValidationService,
    private _genderService: GenderService
  ) {}

  ngOnInit(): void {
    this.idParam = Number(this._route.snapshot.paramMap.get('id'));
    this.initialSubscriberObj.id = this.idParam;
    this.handleUpdateForm();
    this.errorMessages = [];
    this.getAllGenderData();
  }

  handleSubmit() {
    // alert(JSON.stringify(this.initialUserObj));
    if (
      this._validationService.validateSubscriberForm(this.initialSubscriberObj)
    ) {
      // It is Valid Form
      if (this.initialSubscriberObj.id === 0) {
        // Add Form
        this._subscriberService
          .addSubscriberData(this.initialSubscriberObj)
          .subscribe({
            next: (res) => {
              // console.log(res);
              this._router.navigate(['/subscriber-list']);
              this.showCreationSuccess();
            },
            error: (err) => console.log(err),
          });
      } else {
        // Update Form
        this._subscriberService
          .updateSubscriberData(this.idParam, this.initialSubscriberObj)
          .subscribe({
            next: (res) => {
              // console.log(res);
              this._router.navigate(['/subscriber-list']);
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
    if (this.initialSubscriberObj.id !== 0) {
      this._subscriberService
        .getSubscriberDataById(this.initialSubscriberObj.id)
        .subscribe({
          next: (data) => {
            this.initialSubscriberObj = data;
            // console.log(data);
          },
        });
    } else {
      // console.log('Some Error Occured in User Form');
    }
  }

  showCreationSuccess() {
    this._toastr.success('Subscriber Added Successfully!', 'Creation');
  }
  showUpdationSuccess() {
    this._toastr.success('Subscriber Updated Successfully!', 'Updation');
  }
  showError() {
    this._toastr.error('Subscriber Form is invalid!.', 'Error');
  }

  markInvalidInputs(errorMessages: string[]) {
    this.isFirstNameValid = !errorMessages.some((error) =>
      error.includes('First Name')
    );
    this.isLastNameValid = !errorMessages.some((error) =>
      error.includes('Last Name')
    );
    this.isEmailValid = !errorMessages.some((error) => error.includes('Email'));
    this.isContactNumberValid = !errorMessages.some((error) =>
      error.includes('Contact')
    );
    this.isGenderIdValid = !errorMessages.some((error) =>
      error.includes('GenderId')
    );
  }

  getAllGenderData() {
    this._genderService.getAllGenderData().subscribe({
      next: (data) => {
        this.genderList = data;
      },
      error: (err) => console.log(err),
    });
  }
}
