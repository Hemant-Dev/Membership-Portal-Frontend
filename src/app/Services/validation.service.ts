import { Injectable } from '@angular/core';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  errorMessages: string[] = [];
  isValid: boolean = true;
  constructor() { }

  getErrorMessages() {
    return this.errorMessages;
  }

  validateUserForm(userObj: User){
    this.errorMessages = [];
    this.isValid = true;
    userObj.firstName = userObj.firstName.trim();
    userObj.lastName = userObj.lastName.trim();
    userObj.email = userObj.email.trim();
    userObj.password = userObj.password.trim();
    userObj.contactNumber = userObj.contactNumber.trim();
    let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;  // Email Regex Pattern
    let phoneRegex = /^[6-9]\d{9}$/;  // Phone Regex Pattern

    if(userObj.firstName.length === 0 || userObj.firstName === null){
      this.errorMessages.push('First Name cannot be empty.');
      this.isValid = false;
    }else{
      if(userObj.firstName.length > 25){
        this.errorMessages.push('First Name cannot be greater than 25 chars.');
        this.isValid = false;
      }
    }
    if(userObj.lastName.length === 0 || userObj.lastName === null){
      this.errorMessages.push('Last Name cannot be empty.');
      this.isValid = false;
    }else{
      if(userObj.lastName.length > 25){
        this.errorMessages.push('Last Name cannot be greater than 25 chars.');
        this.isValid = false;
      }
    }
    if (userObj.email.length === 0) {
      this.errorMessages.push('Email cannot be empty.');
      this.isValid = false;
    } else {
      if (!regex.test(userObj.email)) {
        this.errorMessages.push('Email is invalid.');
        this.isValid = false;
      }
      if (userObj.email.length > 30) {
        this.errorMessages.push(
          'Email Address cannot be greater than 30 chars.'
        );
        this.isValid = false;
      }
    }

    if (userObj.password.length === 0) {
      this.errorMessages.push('Password cannot be empty.');
      this.isValid = false;
    } else {
      if (userObj.password.length > 50) {
        this.errorMessages.push('Password cannot be greater than 50 chars.');
        this.isValid = false;
      }
    }
    
    if(userObj.contactNumber.length > 10){
      this.errorMessages.push('Contact number cannot be greater than 10 digits.');
      this.isValid = false;
    }

    if (!phoneRegex.test(userObj.contactNumber)) {
      this.errorMessages.push('Contact number is invalid.');
      this.isValid = false;
    }

    return this.isValid;
  }
}
