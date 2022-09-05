import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserDetails } from '../_models/restaurant';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private _apiService: ApiService, private _toastr: ToastrService, private _router: Router) { }

  ngOnInit(): void {
  }

  name: string = '';
  mobile: string = '';
  email: string = '';
  password: string = '';

  postUserDetailsSubscription!: Subscription;

  validData() {
    let msg = '';
    debugger;
    if (this.name == '') {
      msg += 'User name cannot be empty.'
    }
    if (this.mobile == '') {
      msg += 'Mobile number cannot be empty.'
    }
    if (this.email == '') {
      msg += 'Email ID cannot be empty.'
    }
    if (this.password == '') {
      msg += 'Password cannot be empty.'
    }
    if (msg) {
      this._toastr.error(msg, 'ERROR');
      return false;
    }
    return true;
  }

  addUser() {
    if (!this.validData()) return;

    let _userData = new UserDetails();
    _userData.name = this.name;
    _userData.mobile = this.mobile;
    _userData.email = this.email;
    _userData.password = this.password;

    this.postUserDetailsSubscription = this._apiService.postUser(_userData).subscribe((res: any) => {
      this._toastr.success('Registered Successfully.', 'Done!');
      this._router.navigate(['login']);
    })
  }
}
