import { Component, OnInit } from '@angular/core';
import { Product } from '../../../Models/product';
import { ProductService } from '../../../Services/product.service';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrl: './product.component.css',
    imports: [ProductListComponent]
})
export class ProductComponent implements OnInit{
  productList: Product[] = [];
  Title: String = 'Product';

  constructor(private _productService: ProductService){

  }

  ngOnInit(): void {
    // this.getAllProductDataOnInit();
  }

  getAllProductDataOnInit(){
    this._productService.getAllProductData().subscribe({
      next: (data) => {
        this.productList = data;
      },
      error: (err) => console.log(err),
    });
  }

}
