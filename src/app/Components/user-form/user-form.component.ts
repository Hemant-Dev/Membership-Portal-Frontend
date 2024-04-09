import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../Models/user';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  initialUserObj : User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNumber: ''
  }

  constructor(private _userService: UserService){}

  handleSubmit(){
    alert(JSON.stringify(this.initialUserObj));
    this._userService.addUserData(this.initialUserObj).subscribe({
      next: (res) => {
        console.log(res);
      },
      error : (err) => console.log(err),
    });
  }
}
