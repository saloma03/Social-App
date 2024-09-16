import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _HttpClient:HttpClient) { }

  sigunUp(data:object) : Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/users/signup`,data);
  }
  sigunIn(data:object) : Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}/users/signin`,data);
  }
  ChangePassword(data:object): Observable<any>{
    return this._HttpClient.patch(`${environment.baseUrl}/users/change-password` , data);
  }
  uploadProfilePhoto(data:object): Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/users/upload-photo` , data)
  }
  getLoggedUserData():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/users/profile-data`)
  }
}
