import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  constructor(private toastr: ToastrService) {}

  showSuccess() {
    this.toastr.success('Hello World', 'Toastr fun!');
  }
}
