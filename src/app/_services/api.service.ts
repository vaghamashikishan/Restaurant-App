import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  // POST API to add data of restaurant
  postRestaurant(data: any) {
    return this._http.post<any>("http://localhost:3000/posts", data).pipe(map((res: any) => {
      return res;
    }))
  }

  // GET API to get data about restaurant
  getRestaurant() {
    return this._http.get<any>("http://localhost:3000/posts").pipe(map((res: any) => {
      return res;
    }))
  }

  // PUT API to update restaurant data
  updateRestaurant(id: number, data: any) {
    return this._http.put<any>("http://localhost:3000/posts/" + id, data).pipe(map((res: any) => {
      return res;
    }))
  }

  // DELETE API to delete restaurant data
  deleteRestaurant(id: number) {
    return this._http.delete<any>("http://localhost:3000/posts/" + id).pipe(map((res: any) => {
      return res;
    }))
  }

  // getUser(data: any) {
  //   return this._http.post<any>("http://localhost:3000/signup", data).pipe(map((res: any) => {
  //     return res;
  //   }))
  // }
  postUser(data: any) {
    return this._http.post<any>("http://localhost:3000/signup", data).pipe(map((res: any) => {
      return res;
    }))
  }
}
