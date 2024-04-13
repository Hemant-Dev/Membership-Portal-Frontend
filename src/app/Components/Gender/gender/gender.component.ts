import { Component, OnInit } from '@angular/core';
import { Gender } from '../../../Models/gender';
import { GenderService } from '../../../Services/gender.service';
import { GenderListComponent } from '../gender-list/gender-list.component';
import { TableHeaderData } from '../../../Models/table-header-data';
import { GenericListComponent } from '../../generic-list/generic-list.component';

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

  constructor(private _genderService: GenderService) {}

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
}
