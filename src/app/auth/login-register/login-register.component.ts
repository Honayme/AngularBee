import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {MaterializeAction, MaterializeDirective} from 'angular2-materialize';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


declare var $: any ;

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})

export class LoginRegisterComponent implements OnInit {

  registerForm: FormGroup;

  registerData = <any>{};
  loginData = <any>{};

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) { }

  postRegister() {
    this.authService.registerUser(this.registerData);
    this.close();
    this.router.navigate(['/home']);
  }

  postLogin() {
    this.authService.logInUser(this.loginData);
    this.close();
    this.router.navigate(['/home']);
  }

  close() {
    $(document).ready(function(){
      $('#loginRegister').modal('close');
      $('.overlay').css({
        opacity : '0'
      });
    });
  }


  ngOnInit() {

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      firstname: ['', [Validators.required, Validators.maxLength(20)]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d).{4,8}$/)]],
    });

    //Activate login Register modal on click
    $(document).ready(function(){
      $('#loginRegister').modal();
    });


    //Change label size and position when they are focus or not
    // $('.input input').focus(function() {
    //   $(this).parent('.input').each(function() {
    //     $('label', this).css({
    //       'line-height': '18px',
    //       'font-size': '18px',
    //       'font-weight': '100',
    //       'top': '0px'
    //     });
    //   });
    // }).blur(function() {
    //   if ($(this).val() === '') {
    //     $(this).parent('.input').each(function() {
    //       $('label', this).css({
    //         'line-height': '60px',
    //         'font-size': '24px',
    //         'font-weight': '300',
    //         'top': '10px'
    //       });
    //     });
    //   }
    // });


    $('.shape').click(function(e) {
      e.preventDefault();

      let _this = this;

      if ($(this).parent().hasClass('material-button')) {
        setTimeout(function() {
          $('.overbox').css({
            'overflow': 'hidden'
          });

          $('.box').addClass('back');
        }, 200);

        $(this).parent().addClass('active').animate({
          'width': '950px',
          'height': '950px'
        });

        setTimeout(function() {
          $(_this).css({
            'width': '50%',
            'height': '50%',
            'transform': 'rotate(45deg)'
          });

          $('.overbox .title').fadeIn(300);
          $('.overbox .input').fadeIn(300);
          $('.overbox .button').fadeIn(300);

          $(_this).addClass('active');
        }, 800);

        $(this).parent().removeClass('material-button');
        $('#buttonregister').removeAttr('disabled');
        $('#buttonlogin').attr('disabled', 'disabled');

      } else {
        $('#buttonlogin').removeAttr('disabled');
        $('#buttonregister').attr('disabled', 'disabled');

        $(_this).css({
          'width': '100%',
          'height': '100%'
        });

        setTimeout(function() {
          $(_this).css({
            'transform': 'rotate(0deg)'
          });
        }, 800);

        setTimeout(function() {
          $('.overbox').css({
            'overflow': 'initial'
          });
        }, 600);

        $(this).parent().animate({
          'width': '70px',
          'height': '70px'
        }, 500, function() {
          $('.box').removeClass('back');

          $(this).removeClass('active');
        });

        $('.overbox .title').fadeOut(300);
        $('.overbox .input').fadeOut(300);
        $('.overbox .button').fadeOut(300);

        $('.alt-2').addClass('material-buton');
        $(_this).removeClass('active');

      }

      if ($('.alt-2').hasClass('material-buton')) {
        $('.alt-2').removeClass('material-buton');
        $('.alt-2').addClass('material-button');
      }
    });
  }

}
