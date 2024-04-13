import { Component, OnInit } from '@angular/core';
import { Product } from '../../../Models/product';
import { ProductService } from '../../../Services/product.service';
import { ProductListComponent } from '../product-list/product-list.component';
import { TableHeaderData } from '../../../Models/table-header-data';
import { GenericListComponent } from '../../generic-list/generic-list.component';

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

  constructor(private _productService: ProductService) {}

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
}
