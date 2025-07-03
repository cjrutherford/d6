import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly baseUrl = '/api/users';
  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  createUser(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
  updateUser(data: any): Observable<any> {
    return this.http.put(this.baseUrl, data);
  }
  deleteUser(): Observable<any> {
    return this.http.delete(this.baseUrl);
  }
}
