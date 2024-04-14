import { Component, OnInit } from '@angular/core';
import { Product } from '../../../Models/product';
import { ProductService } from '../../../Services/product.service';
import { ProductListComponent } from '../product-list/product-list.component';
import { TableHeaderData } from '../../../Models/table-header-data';
import { GenericListComponent } from '../../generic-list/generic-list.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  imports: [ProductListComponent, GenericListComponent],
})
export class ProductComponent implements OnInit {
  productList: any[] = [];
  productKeys: TableHeaderData[] = [
    { HeaderName: 'Product Name', FieldName: 'productName' },
    { HeaderName: 'Product Price', FieldName: 'price' },
  ];
  Title: string = 'Product';
  AddFormRouteName: string = 'product-form';

  constructor(
    private _productService: ProductService,
    private _toastr: ToastrService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.getAllProductDataOnInit();
  }

  getAllProductDataOnInit() {
    this._productService.getAllProductData().subscribe({
      next: (data) => {
        this.productList = data;
      },
      error: (err) => console.log(err),
    });
  }

  handleEditProduct(productId: number) {
    this._route.navigate(['/product-form', productId]);
  }
  handleDeleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this._productService.deleteProductData(productId).subscribe({
        next: (res) => {
          // console.log(res);
          this.getAllProductDataOnInit();
          this.showSuccess();
        },
        error: (err) => console.log(err),
      });
    }
  }

  showSuccess() {
    this._toastr.success('Data Deleted Successfully!', 'Deletion');
  }
}
