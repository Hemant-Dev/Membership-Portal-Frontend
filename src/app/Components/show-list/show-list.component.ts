import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { info } from 'console';

@Component({
  selector: 'app-show-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.css'
})
export class ShowListComponent implements OnInit{
  @Input() usersList!: User[];
  
  constructor(private _router: Router, private _userService: UserService){}
  ngOnInit(): void {
    this.getAllUserData();
  }
  getAllUserData() {
    this._userService.getAllUserData().subscribe({
      next: (data) => {
        this.usersList = data;
      },
      error: (err) => console.log(err),
    });
  }

  handleEdit(userId: number){
    this._router.navigate(['/user-form', userId]);
  }

  handleDelete(userId: number){
    if(confirm('Are you sure you want to delete this user?')){
      this._userService.deleteUserData(userId).subscribe({
        next: (res) => {
          // console.log(res);
          this.getAllUserData();
          // info('Data Deleted Successfully!');
        },
        error: (err) => console.log(err),
      });
    }
    
  }
}
