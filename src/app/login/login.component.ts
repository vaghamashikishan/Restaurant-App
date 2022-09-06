import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _toastr: ToastrService, private _apiService: ApiService, private _router: Router) { }

  ngOnInit(): void {
  }

  email!: string;
  password!: string;

  getUsersDataSubscription!: Subscription;
  validateUser() {
    this.getUsersDataSubscription = this._apiService.getUsers().subscribe((res: Array<any>) => {
      const usersData = res;
      usersData.find((user: any) => {
        if (this.email === user.email) {
          if (this.password === user.password) {
            this._router.navigate(['/restaurant'])
          } else {
            this._toastr.error('Please enter correct password', 'Wrong Password');
          }
        } else {
          this._toastr.info('Please enter correct email', 'Email not Found');
        }
      });
    })
  }
}
