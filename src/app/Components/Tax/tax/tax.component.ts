import { Component, OnInit } from '@angular/core';
import { TaxService } from '../../../Services/tax.service';
import { TaxListComponent } from '../tax-list/tax-list.component';
import { TableHeaderData } from '../../../Models/table-header-data';
import { GenericListComponent } from '../../generic-list/generic-list.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tax',
  standalone: true,
  templateUrl: './tax.component.html',
  styleUrl: './tax.component.css',
  imports: [TaxListComponent, GenericListComponent],
})
export class TaxComponent implements OnInit {
  taxList: any[] = [];
  taxKeys: TableHeaderData[] = [
    { HeaderName: 'Tax Name', FieldName: 'taxName' },
    { HeaderName: 'SGST %', FieldName: 'sgst' },
    { HeaderName: 'CGST %', FieldName: 'cgst' },
    { HeaderName: 'Total Tax %', FieldName: 'totalTax' },
  ];
  Title: string = 'Tax';
  AddFormRouteName: string = 'tax-form';

  sortOrder: string | null = null;
  sortColumn: string | null = null;

  constructor(
    private _taxService: TaxService,
    private _toastr: ToastrService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.getAllTaxData();
  }

  getAllTaxData() {
    this._taxService.getAllTaxData(this.sortColumn, this.sortOrder).subscribe({
      next: (data) => {
        this.taxList = data;
      },
      error: (err) => console.log(err),
    });
  }

  handleEditTax(taxId: number) {
    this._route.navigate(['/tax-form', taxId]);
  }
  handleDeleteTax(taxId: number) {
    if (confirm('Are you sure you want to delete this tax?')) {
      this._taxService.deleteTaxData(taxId).subscribe({
        next: (res) => {
          // console.log(res);
          this.getAllTaxData();
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
    this.getAllTaxData();
  }

  showSuccess() {
    this._toastr.success('Data Deleted Successfully!', 'Deletion');
  }
}
