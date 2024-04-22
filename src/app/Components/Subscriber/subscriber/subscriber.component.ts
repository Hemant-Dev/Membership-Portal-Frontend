import { Component, OnInit } from '@angular/core';
import { SubscriberListComponent } from '../subscriber-list/subscriber-list.component';
import { Subscriber } from '../../../Models/subscriber';
import { SubscriberService } from '../../../Services/subscriber.service';
import { TableHeaderData } from '../../../Models/table-header-data';
import { GenericListComponent } from '../../generic-list/generic-list.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GenderService } from '../../../Services/gender.service';
import { Gender } from '../../../Models/gender';

@Component({
  selector: 'app-subscriber',
  standalone: true,
  templateUrl: './subscriber.component.html',
  styleUrl: './subscriber.component.css',
  imports: [SubscriberListComponent, GenericListComponent, FormsModule],
})
export class SubscriberComponent implements OnInit {
  subscribersList: any[] = [];
  subscriberKeys: TableHeaderData[] = [
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
      HeaderName: 'Contact No.',
      FieldName: 'contactNumber',
    },
    {
      HeaderName: 'Gender',
      FieldName: 'genderName',
    },
  ];
  Title: string = 'Subscriber';
  AddFormRouteName: string = 'subscriber-form';

  sortOrder: string | null = null;
  sortColumn: string | null = null;
  page = 1;
  pageSize = 5;
  totalPages: number = 0;

  isInSearchMode: boolean = false;
  initialSubscriberObj: Subscriber = {
    id: 0,
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    genderId: 0,
    genderName: '',
  };
  genderList: Gender[] = [];

  constructor(
    private _subscriberService: SubscriberService,
    private _genderService: GenderService,
    private _toastr: ToastrService,
    private _route: Router
  ) {}
  ngOnInit(): void {
    this.getAllGenderData();
    this.getAllSubscriberDataOnInit();
  }

  getAllSubscriberDataOnInit() {
    this._subscriberService
      .getPaginatedAdvanceUserData(
        this.sortColumn,
        this.sortOrder,
        this.page,
        this.pageSize,
        this.initialSubscriberObj
      )
      .subscribe({
        next: (data) => {
          this.subscribersList = data.dataArray;
          this.totalPages = data.totalPages;
          // console.log(data);
        },
        error: (err) => console.log(err),
      });
  }

  handleEditSubscriber(subscriberId: number) {
    this._route.navigate(['/subscriber-form', subscriberId]);
  }
  handleDeleteSubscriber(subscriberId: number) {
    if (confirm('Are you sure you want to delete this subscriber?')) {
      this._subscriberService.deleteSubscriberData(subscriberId).subscribe({
        next: (res) => {
          // console.log(res);
          this.getAllSubscriberDataOnInit();
          this.showSuccess();
        },
        error: (err) => console.log(err),
      });
    }
  }

  handleClear() {
    this.initialSubscriberObj = {
      id: 0,
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      genderId: 0,
      genderName: '',
    };
  }

  handleSortColumn(sortColumn: string) {
    this.sortColumn = sortColumn;
    // this.getAllProductDataOnInit();
    // console.log(this.sortColumn);
  }
  handleSortOrder(sortOrder: string) {
    this.sortOrder = sortOrder;
    // console.log(this.sortOrder);
    this.getAllSubscriberDataOnInit();
  }

  handleSubmit() {
    // console.log(this.initialProductObj);

    this.isInSearchMode = true;
    // console.log('Before:', this.productList);
    if (this.isInSearchMode) {
      this.page = 1;
    }
    this.getAllSubscriberDataOnInit();
    // console.log('After:', this.productList);
  }

  handlePreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.getAllSubscriberDataOnInit();
    } else {
      this.showError();
    }
  }

  handleNextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getAllSubscriberDataOnInit();
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

  getAllGenderData() {
    this._genderService.getAllGenderData(null, null).subscribe({
      next: (data) => {
        this.genderList = data;
      },
      error: (err) => console.log(err),
    });
  }
}
