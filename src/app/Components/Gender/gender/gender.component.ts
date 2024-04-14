import { Component, OnInit } from '@angular/core';
import { Gender } from '../../../Models/gender';
import { GenderService } from '../../../Services/gender.service';
import { GenderListComponent } from '../gender-list/gender-list.component';
import { TableHeaderData } from '../../../Models/table-header-data';
import { GenericListComponent } from '../../generic-list/generic-list.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gender',
  standalone: true,
  templateUrl: './gender.component.html',
  styleUrl: './gender.component.css',
  imports: [GenderListComponent, GenericListComponent],
})
export class GenderComponent implements OnInit {
  genderList: any[] = [];
  genderKeys: TableHeaderData[] = [
    { HeaderName: 'Gender Name', FieldName: 'genderName' },
  ];
  Title: string = 'Gender';
  AddFormRouteName: string = 'gender-form';

  constructor(
    private _genderService: GenderService,
    private _toastr: ToastrService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.getAllGenderDataOnInit();
  }

  getAllGenderDataOnInit() {
    this._genderService.getAllGenderData().subscribe({
      next: (data) => {
        this.genderList = data;
      },
      error: (err) => console.log(err),
    });
  }

  handleEditGender(genderId: number) {
    this._route.navigate(['/gender-form', genderId]);
  }
  handleDeleteGender(genderId: number) {
    if (confirm('Are you sure you want to delete this gender?')) {
      this._genderService.deleteGenderData(genderId).subscribe({
        next: (res) => {
          // console.log(res);
          this.getAllGenderDataOnInit();
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
