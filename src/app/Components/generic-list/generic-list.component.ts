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
  @Input() isInSearchMode!: boolean;

  @Output() onEdit = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() onSortColumn = new EventEmitter<string>();
  @Output() onSortOrder = new EventEmitter<string>();

  sortOrder: string = 'asc';

  handleEdit(obj: number) {
    // console.log(obj);
    this.onEdit.emit(obj);
  }
  handleDelete(obj: number) {
    // console.log(obj);
    this.onDelete.emit(obj);
  }
  handleSortColumn(sortColumn: string) {
    // console.log(sortColumn);
    this.onSortColumn.emit(sortColumn);
  }
  handleSortOrder() {
    this.sortOrder === 'asc'
      ? (this.sortOrder = 'desc')
      : (this.sortOrder = 'asc');
    // console.log(this.sortOrder);
    this.onSortOrder.emit(this.sortOrder);
  }
}
