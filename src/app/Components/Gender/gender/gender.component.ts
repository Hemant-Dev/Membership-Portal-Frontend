import { Component, OnInit } from '@angular/core';
import { Gender } from '../../../Models/gender';
import { GenderService } from '../../../Services/gender.service';
import { GenderListComponent } from "../gender-list/gender-list.component";

@Component({
    selector: 'app-gender',
    standalone: true,
    templateUrl: './gender.component.html',
    styleUrl: './gender.component.css',
    imports: [GenderListComponent]
})
export class GenderComponent implements OnInit {
  
  genderList: Gender[] = [];
  Title: String = 'Gender';

  constructor(private _genderService: GenderService){}

  ngOnInit(): void {
    
  }

  getAllGenderDataOnInit(){
    this._genderService.getAllGenderData().subscribe({
      next: (data) => {
        this.genderList = data;
      },
      error: (err) => console.log(err),
    });
  }

}
