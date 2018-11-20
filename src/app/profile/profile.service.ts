import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Users } from './users';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  path = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient,
              private router: Router) { }


  getProfile(): Observable<Users> {
    return this.http.get<Users>(this.path + '/profile');
  }

  updateProfile(data): Observable<Users> {
    return this.http.put<Users>(this.path + '/profile', data);
  }

}
