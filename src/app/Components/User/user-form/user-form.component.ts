import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../Models/user';
import { UserService } from '../../../Services/user.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../Services/validation.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  initialUserObj: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNumber: '',
  };
  idParam!: number;
  errorMessages: string[] = [];

  //Invalid Inputs Marking
  isFirstNameValid = true;
  isLastNameValid = true;
  isEmailValid = true;
  isPasswordValid = true;
  isContactNumberValid = true;

  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _toastr: ToastrService,
    private _validationService: ValidationService
  ) {}
  ngOnInit(): void {
    this.idParam = Number(this._route.snapshot.paramMap.get('id'));
    this.initialUserObj.id = this.idParam;
    this.handleUpdateForm();
    this.errorMessages = [];
  }

  handleSubmit() {
    // alert(JSON.stringify(this.initialUserObj));
    if (this._validationService.validateUserForm(this.initialUserObj)) {
      // It is Valid Form
      if (this.initialUserObj.id === 0) {
        // Add Form
        this._userService.addUserData(this.initialUserObj).subscribe({
          next: (res) => {
            // console.log(res);
            this._router.navigate(['/user']);
            this.showCreationSuccess();
          },
          error: (err) => console.log(err),
        });
      } else {
        // Update Form
        this._userService
          .updateUserData(this.idParam, this.initialUserObj)
          .subscribe({
            next: (res) => {
              // console.log(res);
              this._router.navigate(['/user']);
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
    if (this.initialUserObj.id !== 0) {
      this._userService.getUserDataById(this.initialUserObj.id).subscribe({
        next: (data) => {
          this.initialUserObj = data;
          // console.log(data);
        },
      });
    } else {
      // console.log('Some Error Occured in User Form');
    }
  }

  showCreationSuccess() {
    this._toastr.success('User Added Successfully!', 'Creation');
  }
  showUpdationSuccess() {
    this._toastr.success('User Updated Successfully!', 'Updation');
  }
  showError() {
    this._toastr.error('User Form is invalid!.', 'Error');
  }

  markInvalidInputs(errorMessages: string[]) {
    this.isFirstNameValid = !errorMessages.some((error) =>
      error.includes('First Name')
    );
    this.isLastNameValid = !errorMessages.some((error) =>
      error.includes('Last Name')
    );
    this.isEmailValid = !errorMessages.some((error) => error.includes('Email'));
    this.isPasswordValid = !errorMessages.some((error) =>
      error.includes('Password')
    );
    this.isContactNumberValid = !errorMessages.some((error) =>
      error.includes('Contact')
    );
  }
}
