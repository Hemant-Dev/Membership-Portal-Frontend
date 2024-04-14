import { Component, OnInit } from '@angular/core';
import { ShowListComponent } from '../show-list/show-list.component';
import { User } from '../../../Models/user';
import { UserService } from '../../../Services/user.service';
import { GenericListComponent } from '../../generic-list/generic-list.component';
import { TableHeaderData } from '../../../Models/table-header-data';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [ShowListComponent, GenericListComponent],
})
export class UserComponent implements OnInit {
  usersList: User[] = [];
  usersKeys: TableHeaderData[] = [
    {
      HeaderName: 'First Name',
      FieldName: 'firstName',
    },
    {
      HeaderName: 'Last Name',
      FieldName: 'lastName',
    },
    {
      HeaderName: 'Email',
      FieldName: 'email',
    },
    {
      HeaderName: 'Password',
      FieldName: 'password',
    },
    {
      HeaderName: 'Contact No.',
      FieldName: 'contactNumber',
    },
  ];

  Title: string = 'User';
  AddFormRouteName: string = 'user-form';

  constructor(
    private _userService: UserService,
    private _route: Router,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllUserDataOnInit();
  }

  getAllUserDataOnInit() {
    this._userService.getAllUserData().subscribe({
      next: (data) => {
        this.usersList = data;
        // console.log(data);
      },
      error: (err) => console.log(err),
    });
  }

  handleEditUser(userId: number) {
    this._route.navigate(['/user-form', userId]);
  }
  handleDeleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this._userService.deleteUserData(userId).subscribe({
        next: (res) => {
          // console.log(res);
          this.getAllUserDataOnInit();
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
