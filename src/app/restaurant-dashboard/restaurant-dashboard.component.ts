import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.scss']
})
export class RestaurantDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'name',
    'address',
    'mobile'
  ];
}
