import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { GenderService } from '../../../Services/gender.service';
import { ToastrService } from 'ngx-toastr';
import { Gender } from '../../../Models/gender';
import { NgFor, NgIf } from '@angular/common';
import { GenderFormComponent } from '../gender-form/gender-form.component';

@Component({
  selector: 'app-gender-list',
  standalone: true,
  templateUrl: './gender-list.component.html',
  styleUrl: './gender-list.component.css',
  imports: [RouterModule, NgIf, NgFor, GenderFormComponent],
})
export class GenderListComponent implements OnInit {
  @Input() genderList!: Gender[];
  constructor(
    private _router: Router,
    private _genderService: GenderService,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllGenderData();
  }

  getAllGenderData() {
    this._genderService.getAllGenderData(null, null).subscribe({
      next: (data) => {
        this.genderList = data;
      },
      error: (err) => console.log(err),
    });
  }
  handleEdit(genderId: number) {
    this._router.navigate(['/gender-form', genderId]);
  }

  handleDelete(genderId: number) {
    if (confirm('Are you sure you want to delete this Gender?')) {
      this._genderService.deleteGenderData(genderId).subscribe({
        next: (res) => {
          // console.log(res);
          this.getAllGenderData();
          // info('Data Deleted Successfully!');
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
