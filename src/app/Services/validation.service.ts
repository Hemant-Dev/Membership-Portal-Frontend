import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { Product } from '../Models/product';
import { Gender } from '../Models/gender';
import { Tax } from '../Models/tax';
import { Subscriber } from '../Models/subscriber';
import { CreateSubscriber } from '../Models/create-subscriber';
import { Discount } from '../Models/discount';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  errorMessages: string[] = [];
  isValid: boolean = true;
  constructor() {}

  getErrorMessages() {
    return this.errorMessages;
  }

  validateUserForm(userObj: User): boolean {
    this.errorMessages = [];
    this.isValid = true;
    userObj.firstName = userObj.firstName.trim();
    userObj.lastName = userObj.lastName.trim();
    userObj.email = userObj.email.trim();
    userObj.password = userObj.password.trim();
    userObj.contactNumber = userObj.contactNumber.trim();
    let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/; // Email Regex Pattern
    let phoneRegex = /^[6-9]\d{9}$/; // Phone Regex Pattern

    if (userObj.firstName.length === 0 || userObj.firstName === null) {
      this.errorMessages.push('First Name cannot be empty.');
      this.isValid = false;
    } else {
      if (userObj.firstName.length > 25) {
        this.errorMessages.push('First Name cannot be greater than 25 chars.');
        this.isValid = false;
      }
    }
    if (userObj.lastName.length === 0 || userObj.lastName === null) {
      this.errorMessages.push('Last Name cannot be empty.');
      this.isValid = false;
    } else {
      if (userObj.lastName.length > 25) {
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

    if (userObj.contactNumber.length > 10) {
      this.errorMessages.push(
        'Contact number cannot be greater than 10 digits.'
      );
      this.isValid = false;
    }

    if (!phoneRegex.test(userObj.contactNumber)) {
      this.errorMessages.push('Contact number is invalid.');
      this.isValid = false;
    }

    return this.isValid;
  }

  validateProductForm(productObj: Product): boolean {
    this.isValid = true;
    this.errorMessages = [];
    productObj.productName = productObj.productName.trim();

    if (
      productObj.productName.length === 0 ||
      productObj.productName === null
    ) {
      this.errorMessages.push('Product Name cannot be empty.');
      this.isValid = false;
    } else {
      if (productObj.productName.length > 50) {
        this.errorMessages.push('First Name cannot be greater than 50 chars.');
        this.isValid = false;
      }
    }

    if (productObj.price === null || productObj.price === undefined) {
      this.errorMessages.push('Price cannot be empty.');
      this.isValid = false;
    } else {
      if (productObj.price === 0) {
        this.errorMessages.push('Price cannot be 0.');
      }
      if (productObj.price > 999999) {
        this.errorMessages.push('Price cannot be greater than 999999');
        this.isValid = false;
      }
    }

    return this.isValid;
  }

  validateGenderForm(genderObj: Gender): boolean {
    this.isValid = true;
    this.errorMessages = [];
    genderObj.genderName = genderObj.genderName.trim();

    if (
      genderObj.genderName === undefined ||
      genderObj.genderName === null ||
      genderObj.genderName.length === 0
    ) {
      this.errorMessages.push('Gender Name cannot be empty.');
      this.isValid = false;
    } else {
      if (genderObj.genderName.length > 11) {
        this.errorMessages.push('Gender Name cannot exceed 10 chars');
        this.isValid = false;
      }
    }

    return this.isValid;
  }

  validateTaxForm(taxObj: Tax): boolean {
    this.isValid = true;
    this.errorMessages = [];

    if (
      taxObj.sgst === 0 ||
      taxObj.sgst === null ||
      taxObj.sgst === undefined
    ) {
      this.errorMessages.push('SGST cannot be empty.');
      this.isValid = false;
    } else {
      if (taxObj.sgst >= 100) {
        this.errorMessages.push('SGST cannot be greater then equal to 100%');
        this.isValid = false;
      }
    }
    if (
      taxObj.cgst === 0 ||
      taxObj.cgst === null ||
      taxObj.cgst === undefined
    ) {
      this.errorMessages.push('CGST cannot be empty.');
      this.isValid = false;
    } else {
      if (taxObj.cgst >= 100) {
        this.errorMessages.push('CGST cannot be greater then equal to 100%');
        this.isValid = false;
      }
    }
    if (
      taxObj.totalTax === 0 ||
      taxObj.totalTax === null ||
      taxObj.totalTax === undefined
    ) {
      this.errorMessages.push('Total Tax cannot be empty.');
      this.isValid = false;
    } else {
      if (taxObj.totalTax > 100) {
        this.errorMessages.push(
          'Total Tax cannot be greater then equal to 100%'
        );
        this.isValid = false;
      }
    }

    return this.isValid;
  }

  validateSubscriberForm(subscriberObj: CreateSubscriber): boolean {
    this.errorMessages = [];
    this.isValid = true;
    subscriberObj.firstName = subscriberObj.firstName.trim();
    subscriberObj.lastName = subscriberObj.lastName.trim();
    subscriberObj.email = subscriberObj.email.trim();
    subscriberObj.contactNumber = subscriberObj.contactNumber.trim();

    let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/; // Email Regex Pattern
    let phoneRegex = /^[6-9]\d{9}$/; // Phone Regex Pattern

    if (
      subscriberObj.firstName.length === 0 ||
      subscriberObj.firstName === null
    ) {
      this.errorMessages.push('First Name cannot be empty.');
      this.isValid = false;
    } else {
      if (subscriberObj.firstName.length > 25) {
        this.errorMessages.push('First Name cannot be greater than 25 chars.');
        this.isValid = false;
      }
    }
    if (
      subscriberObj.lastName.length === 0 ||
      subscriberObj.lastName === null
    ) {
      this.errorMessages.push('Last Name cannot be empty.');
      this.isValid = false;
    } else {
      if (subscriberObj.lastName.length > 25) {
        this.errorMessages.push('Last Name cannot be greater than 25 chars.');
        this.isValid = false;
      }
    }

    if (subscriberObj.contactNumber.length > 10) {
      this.errorMessages.push(
        'Contact number cannot be greater than 10 digits.'
      );
      this.isValid = false;
    }

    if (!phoneRegex.test(subscriberObj.contactNumber)) {
      this.errorMessages.push('Contact number is invalid.');
      this.isValid = false;
    }

    if (subscriberObj.email.length === 0) {
      this.errorMessages.push('Email cannot be empty.');
      this.isValid = false;
    } else {
      if (!regex.test(subscriberObj.email)) {
        this.errorMessages.push('Email is invalid.');
        this.isValid = false;
      }
      if (subscriberObj.email.length > 30) {
        this.errorMessages.push(
          'Email Address cannot be greater than 30 chars.'
        );
        this.isValid = false;
      }
    }

    if (
      subscriberObj.genderId === 0 ||
      subscriberObj.genderId === null ||
      subscriberObj.genderId === undefined
    ) {
      this.errorMessages.push('GenderId is required.');
      this.isValid = false;
    }

    return this.isValid;
  }

  validateDiscountForm(discountoObj: Discount): boolean {
    this.isValid = true;
    return this.isValid;
  }
}
