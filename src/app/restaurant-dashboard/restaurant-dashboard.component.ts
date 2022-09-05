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
    'services',
    'update',
    'delete'
  ];

  isEdit: boolean = false;
  id: number = 0;
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
      (err: HttpErrorResponse) => {
        this._toastr.error(err.error, 'ERROR')
      }
    )
  }

  validForm() {
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

  resetForm() {
    this.isEdit = false;
    this.name = '';
    this.email = '';
    this.mobile = '';
    this.address = '';
    this.services = '';
  }

  update(row: any) {
    this.isEdit = true;
    this.id = row.id;
    this.name = row.name;
    this.email = row.email;
    this.mobile = row.mobile;
    this.address = row.address;
    this.services = row.services;
  }

  postRestaurantData() {
    if (!this.validForm()) return;
    let _formGroup = new restaurantData();
    _formGroup.name = this.name;
    _formGroup.email = this.email;
    _formGroup.mobile = this.mobile;
    _formGroup.address = this.address;
    _formGroup.services = this.services;

    if (this.isEdit) {
      this.postRestaurantDataSubscription = this._apiService.updateRestaurant(this.id, _formGroup).subscribe((res: any) => {
        this._toastr.success('Record updated successfully.', 'Tasl Done');
        this.getRestaurantData();
        this.closeDialog.nativeElement.click();
      }, (err: any) => {
        this._toastr.error(err, 'Task Failed');
      })
    } else {
      this.postRestaurantDataSubscription = this._apiService.postRestaurant(_formGroup).subscribe((res: any) => {
        this._toastr.success('Data added successfully.', 'Task Done');
        this.getRestaurantData();
        this.closeDialog.nativeElement.click();
      }, (err: any) => {
        this._toastr.error(err, 'Task Failed');
      })
    }
  }
}
