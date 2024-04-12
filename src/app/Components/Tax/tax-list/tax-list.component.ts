import { Component, Input, OnInit } from '@angular/core';
import { Tax } from '../../../Models/tax';
import { Router, RouterModule } from '@angular/router';
import { TaxService } from '../../../Services/tax.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { TaxFormComponent } from '../tax-form/tax-form.component';

@Component({
  selector: 'app-tax-list',
  standalone: true,
  imports: [RouterModule, CommonModule, TaxFormComponent],
  templateUrl: './tax-list.component.html',
  styleUrl: './tax-list.component.css'
})
export class TaxListComponent implements OnInit{
  @Input() taxList!: Tax[];
  constructor(private _router: Router, private _taxService: TaxService, private _toastr: ToastrService
  ){}
  ngOnInit(): void {
    this.getAllTaxData();
  }

  getAllTaxData(){
    this._taxService.getAllTaxData().subscribe({
      next: (data) => {
        this.taxList = data;
      },
      error: (err) => console.log(err),
    });
  }
  handleEdit(taxId: number){
    this._router.navigate(['/tax-form', taxId]);
  }

  handleDelete(taxId: number){
    if(confirm('Are you sure you want to delete this tax?')){
      this._taxService.deleteTaxData(taxId).subscribe({
        next: (res) => {
          // console.log(res);
          this.getAllTaxData();
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
