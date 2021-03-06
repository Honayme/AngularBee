import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ILogin} from '../ilogin';

declare var $: any ;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = <ILogin>{};
  loginForm: FormGroup;
  loginInvalid = false;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) {}

  closeLogin() {
    $('#login').modal('close');
  }

  postLogin() {
    this.loginData = Object.assign(this.loginData, this.loginForm.value);
    this.authService.logInUser(this.loginData).subscribe(res => {
      if (!res) {
        this.loginInvalid = true;
        console.log(this.loginData);
      } else {
        this.closeLogin();
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
    $(document).ready(function() {
      $('.modal').modal();
    });

    //Trigger modal login button with enter key
    $(document).on('keydown', function (e) {
      const keycode = e.which || e.keyCode;
      if (keycode === 13) {
        $('#buttonLogin').trigger('click');
      } else {
        setTimeout(function () {
          $('.materialContainer').find('#buttonlogin').trigger('click');
        }, 400);
      }
    });
  }


}
