import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../_services/api.service';
import { restaurantData } from '../_models/restaurant';
import { Subscription } from "rxjs";
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.scss']
})
export class RestaurantDashboardComponent implements OnInit {

  constructor(
    private _apiService: ApiService,
    private _toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getRestaurantData();
  }

  @ViewChild('CloseDialog') closeDialog!: ElementRef;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'mobile',
    'address',
    'services'
  ];

  name: string = '';
  email: string = '';
  mobile: string = '';
  address: string = '';
  services: string = '';

  getRestaurantDataSubscription!: Subscription;
  postRestaurantDataSubscription!: Subscription;

  getRestaurantData() {
    this.getRestaurantDataSubscription = this._apiService.getRestaurant().subscribe((res: any) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      (err: any) => {
        this._toastr.error(err, 'ERROR')
      }
    )
  }

  validForm() {
    debugger;
    let msg = '';
    if (this.name == '') {
      msg += 'Name cannot be empty.';
    }
    if (this.email == '') {
      msg += 'Email cannot be empty.';
    }
    if (this.mobile == '') {
      msg += 'Mobile number cannot be empty.';
    }
    if (this.address == '') {
      msg += 'Address cannot be empty.';
    }
    if (this.services == '') {
      msg += 'Restaurant services cannot be empty.';
    }

    if (msg) {
      this._toastr.error(msg, 'Error...');
      return false;
    }
    return true;
  }

  postRestaurantData() {
    if (!this.validForm()) return;
    let _formGroup = new restaurantData();
    _formGroup.name = this.name;
    _formGroup.email = this.email;
    _formGroup.mobile = this.mobile;
    _formGroup.address = this.address;
    _formGroup.services = this.services;

    this.postRestaurantDataSubscription = this._apiService.postRestaurant(_formGroup).subscribe((res: any) => {
      this._toastr.success('Data added successfully.', 'Task Done');
      this.getRestaurantData();
      this.closeDialog.nativeElement.click();
    }, (err: any) => {
      this._toastr.error(err, 'Task Failed');
    })
  }
}
