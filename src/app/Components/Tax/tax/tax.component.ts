import { Component, OnInit } from '@angular/core';
import { Tax } from '../../../Models/tax';
import { TaxService } from '../../../Services/tax.service';
import { TaxListComponent } from '../tax-list/tax-list.component';
import { TableHeaderData } from '../../../Models/table-header-data';
import { GenericListComponent } from '../../generic-list/generic-list.component';

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
    { HeaderName: 'SGST %', FieldName: 'sgst' },
    { HeaderName: 'CGST %', FieldName: 'cgst' },
    { HeaderName: 'Total Tax %', FieldName: 'totalTax' },
  ];
  Title: string = 'Tax';
  AddFormRouteName: string = 'tax-form';

  constructor(private _taxService: TaxService) {}

  ngOnInit(): void {
    this.getAllTaxData();
  }

  getAllTaxData() {
    this._taxService.getAllTaxData().subscribe({
      next: (data) => {
        this.taxList = data;
      },
      error: (err) => console.log(err),
    });
  }
}
