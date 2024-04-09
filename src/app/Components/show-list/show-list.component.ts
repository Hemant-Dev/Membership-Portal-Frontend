import { Component, Input } from '@angular/core';
import { User } from '../../Models/user';

@Component({
  selector: 'app-show-list',
  standalone: true,
  imports: [],
  templateUrl: './show-list.component.html',
  styleUrl: './show-list.component.css'
})
export class ShowListComponent {
  @Input() usersList!: User[];

  constructor(){}

  handleEdit(userId: number){
    
  }
  
  handleDelete(userId: number){

  }
}
