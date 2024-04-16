import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from '../../../Models/subscription';
import { Router, RouterModule } from '@angular/router';
import { SubscriptionService } from '../../../Services/subscription.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscription-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subscription-list.component.html',
  styleUrl: './subscription-list.component.css',
})
export class SubscriptionListComponent implements OnInit {
  @Input() subscriptionList!: Subscription[];
  constructor(
    private _router: Router,
    private _subscriptionService: SubscriptionService,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getAllSubscriptionData();
  }

  getAllSubscriptionData() {
    this._subscriptionService.getAllSubscriptionData().subscribe({
      next: (data) => {
        this.subscriptionList = data;
      },
      error: (err) => console.log(err),
    });
  }
  handleEdit(subscriptionId: number) {
    this._router.navigate(['/test-form', subscriptionId]);
  }

  handleDelete(subscriptionId: number) {
    if (confirm('Are you sure you want to delete this Subscription?')) {
      this._subscriptionService
        .deleteSubscriptionData(subscriptionId)
        .subscribe({
          next: (res) => {
            // console.log(res);
            this.getAllSubscriptionData();
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
