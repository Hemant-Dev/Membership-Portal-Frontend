import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-generic-list',
  standalone: true,
  imports: [RouterModule, NgIf, NgFor],
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.css'
})
export class GenericListComponent<T> implements OnInit {
  @Input() itemsList: T[] = [];
  @Input() itemsKeys!: String[];
  @Input() itemsTitle!: String;

  itemsNumber: number[] = [];

  ngOnInit(): void {
    // Ensure itemsKeys is not null or undefined
    if (this.itemsKeys && this.itemsKeys.length > 0) {
      // Generate itemsNumber based on the length of itemsKeys
      this.itemsNumber = Array.from({ length: this.itemsKeys.length }, (_, i) => i + 1);
    }
  }

  handleEdit(){

  }
  handleDelete(){

  }
}
