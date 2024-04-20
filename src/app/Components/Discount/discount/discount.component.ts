import { Component, OnInit } from '@angular/core';
import { Discount } from '../../../Models/discount';
import { TableHeaderData } from '../../../Models/table-header-data';
import { DiscountService } from '../../../Services/discount.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GenericListComponent } from '../../generic-list/generic-list.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-discount',
  standalone: true,
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.css',
  imports: [GenericListComponent, FormsModule],
})
export class DiscountComponent implements OnInit {
  discountList: any[] = [];
  discountKeys: TableHeaderData[] = [
    {
      HeaderName: 'Discount Code',
      FieldName: 'discountCode',
    },
    {
      HeaderName: 'Discount Amount',
      FieldName: 'discountAmount',
    },
    {
      HeaderName: 'Is Discount in Percentage',
      FieldName: 'isDiscountInPercentage',
    },
  ];
  Title: string = 'Discount';
  AddFormRouteName: string = 'discount-form';

  sortOrder: string | null = null;
  sortColumn: string | null = null;
  page = 1;
  pageSize = 5;
  totalPages: number = 0;

  isInSearchMode: boolean = false;
  initialDiscountObj: Discount = {
    id: 0,
    discountCode: '',
    discountAmount: 0,
    isDiscountInPercentage: false,
  };

  constructor(
    private _discountService: DiscountService,
    private _toastr: ToastrService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.getAllDiscountDataOnInit();
  }

  getAllDiscountDataOnInit() {
    if (this.initialDiscountObj.discountAmount === null) {
      this.initialDiscountObj.discountAmount = 0;
    }
    this._discountService
      .getPaginatedAdvanceDiscountData(
        this.sortColumn,
        this.sortOrder,
        this.page,
        this.pageSize,
        this.initialDiscountObj
      )
      .subscribe({
        next: (data) => {
          this.discountList = data.dataArray;
          this.totalPages = data.totalPages;
        },
        error: (err) => console.log(err),
      });
  }

  handleEditDiscount(discountId: number) {
    this._route.navigate(['/discount-form', discountId]);
  }
  handleDeleteDiscount(discountId: number) {
    if (confirm('Are you sure you want to delete this discount?')) {
      this._discountService.deleteDiscountData(discountId).subscribe({
        next: (res) => {
          // console.log(res);
          this.getAllDiscountDataOnInit();
          this.showSuccess();
        },
        error: (err) => console.log(err),
      });
    }
  }
  handleClear() {
    this.initialDiscountObj = {
      id: 0,
      discountCode: '',
      discountAmount: 0,
      isDiscountInPercentage: false,
    };
  }

  handleSortColumn(sortColumn: string) {
    this.sortColumn = sortColumn;
    // this.getAllProductDataOnInit();
    // console.log(this.sortColumn);
  }
  handleSortOrder(sortOrder: string) {
    this.sortOrder = sortOrder;
    // console.log(this.sortOrder);
    this.getAllDiscountDataOnInit();
  }

  handleSubmit() {
    // console.log(this.initialProductObj);

    this.isInSearchMode = true;
    // console.log('Before:', this.productList);
    this.getAllDiscountDataOnInit();
    // console.log('After:', this.productList);
  }

  handlePreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.getAllDiscountDataOnInit();
    } else {
      this.showError();
    }
  }

  handleNextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getAllDiscountDataOnInit();
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
