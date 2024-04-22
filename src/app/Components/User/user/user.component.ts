import { Component, OnInit } from '@angular/core';
import { ShowListComponent } from '../show-list/show-list.component';
import { User } from '../../../Models/user';
import { UserService } from '../../../Services/user.service';
import { GenericListComponent } from '../../generic-list/generic-list.component';
import { TableHeaderData } from '../../../Models/table-header-data';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [ShowListComponent, GenericListComponent, FormsModule],
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

  sortOrder: string | null = null;
  sortColumn: string | null = null;
  page = 1;
  pageSize = 5;
  totalPages: number = 0;

  isInSearchMode: boolean = false;
  initialUserObj: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNumber: '',
  };

  constructor(
    private _userService: UserService,
    private _route: Router,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllUserDataOnInit();
  }

  getAllUserDataOnInit() {
    this._userService
      .getPaginatedAdvanceUserData(
        this.sortColumn,
        this.sortOrder,
        this.page,
        this.pageSize,
        this.initialUserObj
      )
      .subscribe({
        next: (data) => {
          this.usersList = data.dataArray;
          this.totalPages = data.totalPages;
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

  handleClear() {
    this.initialUserObj = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      contactNumber: '',
    };
    this.isInSearchMode = false;
    this.getAllUserDataOnInit();
  }

  handleSortColumn(sortColumn: string) {
    this.sortColumn = sortColumn;
    // this.getAllProductDataOnInit();
    // console.log(this.sortColumn);
  }
  handleSortOrder(sortOrder: string) {
    this.sortOrder = sortOrder;
    // console.log(this.sortOrder);
    this.getAllUserDataOnInit();
  }

  handleSubmit() {
    // console.log(this.initialProductObj);

    this.isInSearchMode = true;
    // console.log('Before:', this.productList);
    if (this.isInSearchMode) {
      this.page = 1;
    }
    this.getAllUserDataOnInit();
    // console.log('After:', this.productList);
  }

  handlePreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.getAllUserDataOnInit();
    } else {
      this.showError();
    }
  }

  handleNextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getAllUserDataOnInit();
    } else {
      this.showError();
    }
  }

  showSuccess() {
    this._toastr.success('Data Deleted Successfully!', 'Deletion');
  }
  showError() {
    this._toastr.error('Page does not exist!', 'Pagination');
  }
}
