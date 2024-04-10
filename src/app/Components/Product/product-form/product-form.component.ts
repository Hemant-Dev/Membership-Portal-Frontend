import { Component, OnInit } from '@angular/core';
import { Product } from '../../../Models/product';
import { ProductService } from '../../../Services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../../Services/validation.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, RouterModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit{
  initialProductObj: Product = {
    id: 0,
    productName: '',
    price: 0
  }
  idParam!: number;
  errorMessages: string[] = [];

  isProductNameValid = true;
  isPriceValid = true;

  constructor(private _productService: ProductService, private _route: ActivatedRoute, 
    private _router:Router, private _toastr: ToastrService,
    private _validationService: ValidationService
  ){}

  ngOnInit(): void {
    this.idParam = Number(this._route.snapshot.paramMap.get('id'));
    this.initialProductObj.id = this.idParam;
    this.handleUpdateForm();
    this.errorMessages = [];
  }

  handleSubmit(){
    // alert(JSON.stringify(this.initialProductObj));
    if(this._validationService.validateProductForm(this.initialProductObj)){
      // It is Valid Form 
      if(this.initialProductObj.id === 0){
        // Add Form
        this._productService.addProductData(this.initialProductObj).subscribe({
          next: (res) => {
            // console.log(res);
            this._router.navigate(['/product-list']);
            this.showCreationSuccess();
          },
          error : (err) => console.log(err),
        });
      }else{
        // Update Form
        this._productService.updateProductData(this.idParam, this.initialProductObj).subscribe({
          next: (res) => {
            // console.log(res);
            this._router.navigate(['/product-list']);
            this.showUpdationSuccess();
          },
          error: (err) => console.log(err),
        });
      }
    }
    else{
      // Not a valid form
      this.errorMessages = this._validationService.getErrorMessages();
      this.markInvalidInputs(this.errorMessages);
      this.showError();
    }
  }

  handleUpdateForm(){
    if(this.initialProductObj.id !== 0){
      this._productService.getProductDataById(this.initialProductObj.id).subscribe({
        next: (data) => {
          this.initialProductObj = data;
          // console.log(data);
        }
      });
    }else{
      // console.log('Some Error Occured in User Form');
    }
  }
  
  showCreationSuccess(){
    this._toastr.success('Product Added Successfully!', 'Creation');
  }
  showUpdationSuccess(){
    this._toastr.success('Product Updated Successfully!', 'Updation');
  }
  showError(){
    this._toastr.error('Product Form is invalid!.', 'Error');
  }

  markInvalidInputs(errorMessages: string[]) {
    this.isProductNameValid = !errorMessages.some(error => error.includes("Product Name"));
    this.isPriceValid = !errorMessages.some(error => error.includes("Price"));
  }

}
