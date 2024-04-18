import { Component, OnInit } from '@angular/core';
import { Product } from '../../../Models/product';
import { ProductService } from '../../../Services/product.service';
import { ProductListComponent } from '../product-list/product-list.component';
import { TableHeaderData } from '../../../Models/table-header-data';
import { GenericListComponent } from '../../generic-list/generic-list.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  imports: [ProductListComponent, GenericListComponent, FormsModule],
})
export class ProductComponent implements OnInit {
  productList: any[] = [];
  productKeys: TableHeaderData[] = [
    { HeaderName: 'Product Name', FieldName: 'productName' },
    { HeaderName: 'Product Price', FieldName: 'price' },
  ];
  Title: string = 'Product';
  AddFormRouteName: string = 'product-form';

  sortOrder: string | null = null;
  sortColumn: string | null = null;
  page = 1;
  pageSize = 5;
  totalPages: number = 0;

  isInSearchMode: boolean = false;

  initialProductObj: Product = {
    id: 0,
    productName: '',
    price: 0,
  };

  constructor(
    private _productService: ProductService,
    private _toastr: ToastrService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.getAllProductDataOnInit();
    // this.isInSearchMode = false;
  }

  // getAllProductDataOnInit() {
  //   this._productService
  //     .getAllProductData(this.sortColumn, this.sortOrder)
  //     .subscribe({
  //       next: (data) => {
  //         this.productList = data;
  //       },
  //       error: (err) => console.log(err),
  //     });
  // }
  getAllProductDataOnInit() {
    this._productService
      .getPaginatedAdvanceProductData(
        this.sortColumn,
        this.sortOrder,
        this.page,
        this.pageSize,
        this.initialProductObj
      )
      .subscribe({
        next: (data) => {
          this.productList = data.dataArray;
          this.totalPages = data.totalPages;
          // console.log(data);
          // console.log(this.sortColumn, this.sortOrder);
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

  handleSortColumn(sortColumn: string) {
    this.sortColumn = sortColumn;
    // this.getAllProductDataOnInit();
    // console.log(this.sortColumn);
  }
  handleSortOrder(sortOrder: string) {
    this.sortOrder = sortOrder;
    // console.log(this.sortOrder);
    this.getAllProductDataOnInit();
  }

  handleSubmit() {
    // console.log(this.initialProductObj);
    if (this.initialProductObj.price === null) {
      this.initialProductObj.price = 0;
    }
    this.isInSearchMode = true;
    // console.log('Before:', this.productList);
    this.getAllProductDataOnInit();
    // console.log('After:', this.productList);
  }

  handlePreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.getAllProductDataOnInit();
    } else {
      this.showError();
    }
  }

  handleNextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getAllProductDataOnInit();
    } else {
      this.showError();
    }
  }

  showSuccess() {
    this._toastr.success('Data Deleted Successfully!', 'Deletion');
  }

  showError() {
    this._toastr.error('Page does not exist!', 'Pagination');
  }
}
