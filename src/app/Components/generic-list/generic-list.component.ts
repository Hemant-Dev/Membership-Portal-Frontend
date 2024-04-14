import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableHeaderData } from '../../Models/table-header-data';

@Component({
  selector: 'app-generic-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.css',
})
export class GenericListComponent {
  @Input() itemsList: any[] = [];
  @Input() itemsKeys!: TableHeaderData[];
  @Input() itemsTitle!: string;
  @Input() itemAddFormRouteName!: string;

  @Output() onEdit = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();

  handleEdit(obj: number) {
    // console.log(obj);
    this.onEdit.emit(obj);
  }
  handleDelete(obj: number) {
    // console.log(obj);
    this.onDelete.emit(obj);
  }
}
