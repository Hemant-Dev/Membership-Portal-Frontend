import { Component, OnInit } from '@angular/core';
import { Discount } from '../../../Models/discount';
import { TableHeaderData } from '../../../Models/table-header-data';
import { DiscountService } from '../../../Services/discount.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GenericListComponent } from '../../generic-list/generic-list.component';

@Component({
  selector: 'app-discount',
  standalone: true,
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.css',
  imports: [GenericListComponent],
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

  constructor(
    private _discountService: DiscountService,
    private _toastr: ToastrService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.getAllDiscountDataOnInit();
  }

  getAllDiscountDataOnInit() {
    this._discountService.getAllDiscountData().subscribe({
      next: (data) => {
        this.discountList = data;
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

  showSuccess() {
    this._toastr.success('Data Deleted Successfully!', 'Deletion');
  }
}
