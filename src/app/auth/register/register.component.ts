import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EqualValidatorDirective} from '../../shared/equal-validator.directive';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  registerData = <any>{};

  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passPattern = /^(?=.*\d).{4,8}$/;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) {
  }

  postRegister() {
    this.registerData = Object.assign(this.registerData, this.registerForm.value);
    this.authService.registerUser(this.registerData);
    console.log(this.registerData);
    this.closeRegister();
    this.router.navigate(['/home']);
  }

  closeRegister() {
    $('#register').modal('close');
  }

  ngOnInit() {

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(this.passPattern)]],
      passwordConfirm: ['', []]
    });

    $(document).ready(function () {
      $('#register').modal();
    });

    //Trigger modal login button with enter key
    $(document).on('keydown', function (e) {
      const keycode = e.which || e.keyCode;
      if (keycode === 13) {
        $('#buttonRegister').trigger('click');
      } else {
        setTimeout(function () {
          $('.materialContainer').find('#buttonlogin').trigger('click');
        }, 400);
      }
    });
  }
}
