import { Component, OnInit } from '@angular/core';
import { ShowListComponent } from "../show-list/show-list.component";
import { User } from '../../../Models/user';
import { UserService } from '../../../Services/user.service';
import { GenericListComponent } from '../../generic-list/generic-list.component';

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    imports: [ShowListComponent, GenericListComponent]
})
export class UserComponent implements OnInit{

  usersList: User[] = [];
  usersKeys: String[] = ['First Name', 'Last Name', 'Email', 'Password', 'Contact Number'];
  usersValues: String[] = [];
  Title: String = 'User';
  constructor(private _userService: UserService){

  }
  ngOnInit(): void {
    this.getAllUserDataOnInit();
    this.extractValuesFromUsers();
  }

  getAllUserDataOnInit(){
    this._userService.getAllUserData().subscribe({
      next: (data) => {
        this.usersList = data;
        // console.log(data);
      },
      error: (err) => console.log(err),
    });
  }

  extractValuesFromUsers(){

  }
  
  
}
