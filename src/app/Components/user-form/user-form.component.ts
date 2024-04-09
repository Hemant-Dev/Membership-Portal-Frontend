import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../Models/user';
import { UserService } from '../../Services/user.service';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  initialUserObj : User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNumber: ''
  }
  idParam!: number;
  constructor(private _userService: UserService, private _route: ActivatedRoute, private _router:Router){}
  ngOnInit(): void {
    this.idParam = Number(this._route.snapshot.paramMap.get('id'));
    this.initialUserObj.id = this.idParam;
    this.handleUpdateForm();
  }

  handleSubmit(){
    // alert(JSON.stringify(this.initialUserObj));
    if(this.initialUserObj.id === 0){
      // Add Form
      this._userService.addUserData(this.initialUserObj).subscribe({
        next: (res) => {
          console.log(res);
          this._router.navigate(['/showList']);
        },
        error : (err) => console.log(err),
      });
    }else{
      // Update Form
      this._userService.updateUserData(this.idParam, this.initialUserObj).subscribe({
        next: (res) => {
          console.log(res);
          this._router.navigate(['/showList']);
        },
        error: (err) => console.log(err),
      });
    }
    
  }

  handleUpdateForm(){
    if(this.initialUserObj.id !== 0){
      this._userService.getUserDataById(this.initialUserObj.id).subscribe({
        next: (data) => {
          this.initialUserObj = data;
          console.log(data);
        }
      });
    }else{
      // console.log('Some Error Occured in User Form');
    }
  }
}
