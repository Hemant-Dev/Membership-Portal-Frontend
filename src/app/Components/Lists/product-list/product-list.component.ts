import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../Models/product';
import { ProductService } from '../../../Services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  @Input() productList!: Product[];
  constructor(private _router: Router, private _productService: ProductService, private _toastr: ToastrService){

  }
  ngOnInit(): void {
    this.getAllProductData();
  }

  getAllProductData(){
    this._productService.getAllProductData().subscribe({
      next: (data) => {
        this.productList = data;
      },
      error: (err) => console.log(err),
    });
  }

  handleEdit(productId: number){
    this._router.navigate(['/product-form', productId]);
  }

  handleDelete(productId: number){
    if(confirm('Are you sure you want to delete this Product?')){
      this._productService.deleteProductData(productId).subscribe({
        next: (res) => {
          // console.log(res);
          this.getAllProductData();
          // info('Data Deleted Successfully!');
          this.showSuccess();
        },
        error: (err) => console.log(err),
      });
    }
  }

  showSuccess(){
    this._toastr.success('Data Deleted Successfully!', 'Deletion')
  }
}
