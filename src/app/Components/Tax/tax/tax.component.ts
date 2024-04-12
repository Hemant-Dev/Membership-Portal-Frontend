import { Component, OnInit } from '@angular/core';
import { Tax } from '../../../Models/tax';
import { TaxService } from '../../../Services/tax.service';
import { TaxListComponent } from "../tax-list/tax-list.component";

@Component({
    selector: 'app-tax',
    standalone: true,
    templateUrl: './tax.component.html',
    styleUrl: './tax.component.css',
    imports: [TaxListComponent]
})
export class TaxComponent implements OnInit {

  taxList: Tax[] = [];
  Title: string = 'Tax';

  constructor(private _taxService: TaxService){}

  ngOnInit(): void {
    
  }

  getAllTaxData(){
    this._taxService.getAllTaxData().subscribe({
      next: (data) => {
        this.taxList = data;
      },
      error: (err) => console.log(err),
    });
  }
}
