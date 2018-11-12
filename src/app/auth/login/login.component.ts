import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../iuser';

declare var $: any ;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = <IUser>{};
  loginForm: FormGroup;
  loginInvalid = false;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) {}

  close(){
    $('#login').modal('close');
  }

  postLogin() {
    this.loginData = Object.assign(this.loginData, this.loginForm.value);
    this.authService.logInUser(this.loginData).subscribe(res => {
      if (!res) {
        this.loginInvalid = true;
        console.log(this.loginData);
      } else {
        this.close();
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnInit() {
    // Form //
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // jQuery //
    $(document).ready(function(){
      $('#login').modal();
    });

    //TODO Appuyer sur entrée pour valider le formulaire de login
  }


}
