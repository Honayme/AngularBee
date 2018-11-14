import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import 'rxjs/add/operator/map';
import {ILogin} from './ilogin';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  path = 'http://localhost:3000/api/users';
  TOKEN_KEY = 'token';

  constructor(private http: HttpClient,
              private router: Router) {
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    if (localStorage.getItem(this.TOKEN_KEY)) {
      const jwt = jwt_decode(localStorage.getItem(this.TOKEN_KEY));

      const current_time = new Date().getTime() / 1000;
      const segments = localStorage.getItem(this.TOKEN_KEY).split('.');

      if (current_time > jwt.exp
        && segments.length !== 3
        && jwt.userId === false) {
        this.logout();
      }
    }

    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/home']);
  }

  logInUser(loginData) {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'})};

    return this.http.post(this.path + '/login', loginData, options)
      .pipe(tap(res => {
        console.log(res['token']);
        this.saveToken(res['token']);
      }))
      .pipe(catchError(err => {
        console.log('Invalid credentials => ' + err);
        return of(false);
      }));
  }

  registerUser(registerData) {
    return this.http.post<any>(this.path + '/register', registerData).subscribe(res => {
      console.log(res);
      this.saveToken(res.token);
    });
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
