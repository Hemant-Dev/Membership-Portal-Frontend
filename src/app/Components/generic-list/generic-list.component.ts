import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableHeaderData } from '../../Models/table-header-data';

@Component({
  selector: 'app-generic-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './generic-list.component.html',
  styleUrl: './generic-list.component.css',
})
export class GenericListComponent<T> implements OnInit {
  @Input() itemsList: any[] = [];
  @Input() itemsKeys!: TableHeaderData[];
  @Input() itemsTitle!: string;
  @Input() itemAddFormRouteName!: string;

  ngOnInit(): void {}

  handleEdit() {}
  handleDelete() {}
}
