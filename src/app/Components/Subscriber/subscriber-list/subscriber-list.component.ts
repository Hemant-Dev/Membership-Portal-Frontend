import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscriber } from '../../../Models/subscriber';
import { ToastrService } from 'ngx-toastr';
import { SubscriberService } from '../../../Services/subscriber.service';

@Component({
  selector: 'app-subscriber-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './subscriber-list.component.html',
  styleUrl: './subscriber-list.component.css',
})
export class SubscriberListComponent implements OnInit {
  @Input() subscriberList!: Subscriber[];
  // @Input() genericLists!: T[];

  constructor(
    private _router: Router,
    private _subscriberService: SubscriberService,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllSubscriberData();
  }
  getAllSubscriberData() {
    this._subscriberService.getAllSubscriberData(null, null).subscribe({
      next: (data) => {
        this.subscriberList = data;
      },
      error: (err) => console.log(err),
    });
  }

  handleEdit(subscriberId: number) {
    this._router.navigate(['/subscriber-form', subscriberId]);
  }

  handleDelete(subscriberId: number) {
    if (confirm('Are you sure you want to delete this subscriber?')) {
      this._subscriberService.deleteSubscriberData(subscriberId).subscribe({
        next: (res) => {
          // console.log(res);
          this.getAllSubscriberData();
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
