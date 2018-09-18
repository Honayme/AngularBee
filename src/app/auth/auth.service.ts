import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  path = 'http://localhost:3000/api/users';
  TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  get isAuthenticated() {
    // TODO Add method to check is it's a valid token
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  logInUser(loginData) {
    return this.http.post<any>(this.path + '/login', loginData).subscribe(res => {
      console.log(res.token);
      this.saveToken(res.token);
    });
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
