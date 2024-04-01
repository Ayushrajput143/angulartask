import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  uploadimage(formData: FormData) {
    throw new Error('Method not implemented.');
  }

  constructor(private _http:HttpClient) { }

  addUsers(data:any): Observable<any>{
    return this._http.post('http://localhost:3000/users', data);
  }

  getUsers(): Observable<any>{
    return this._http.get('http://localhost:3000/users');
  }
  deleteUsers(id:number): Observable<any>{
    return this._http.delete(`http://localhost:3000/users/${id}`);
  }

  //for dash
  deleteDetails(id: string) {
    return this._http.delete(`http://localhost:3000/users/${id}`);
  }
  
}
