import { Component, OnInit } from '@angular/core';
import { ShowListComponent } from "../show-list/show-list.component";
import { User } from '../../Models/user';
import { UserService } from '../../Services/user.service';

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    imports: [ShowListComponent]
})
export class UserComponent implements OnInit{

  usersList: User[] = [];
  constructor(private _userService: UserService){

  }
  ngOnInit(): void {
    this.getAllUserDataOnInit();
  }

  getAllUserDataOnInit(){
    this._userService.getAllUserData().subscribe({
      next: (data) => {
        this.usersList = data;
        console.log(data);
      },
      error: (err) => console.log(err),
    });
  }
  
}
