import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

declare var $: any ;

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  registerData = {};
  loginData = {};

  constructor(private authService: AuthService,
              private router: Router) { }

  postRegister() {
    this.authService.registerUser(this.loginData);
    this.router.navigate(['/home']);
  }

  postLogin() {
    this.authService.logInUser(this.loginData);
    this.router.navigate(['/home']);
  }

  ngOnInit() {

    $('.materialContainer').on('click', function () {
      let body = $('body');

      if ($(':animated').length) {
        body.addClass('no-events');

        setTimeout(function () {
          body.removeClass('no-events');
        }, 800);
      }
    });

    $(".input input").focus(function() {
      $(this).parent(".input").each(function() {
        $("label", this).css({
          "line-height": "18px",
          "font-size": "18px",
          "font-weight": "100",
          "top": "0px"
        });

        $(".spin", this).css({
          "width": "100%"
        })
      });
    }).blur(function() {
      $(".spin").css({
        "width": "0px"
      });
      if ($(this).val() == "") {
        $(this).parent(".input").each(function() {
          $("label", this).css({
            "line-height": "60px",
            "font-size": "24px",
            "font-weight": "300",
            "top": "10px"
          })
        });
      }
    });

    $(".button").click(function(e) {
      let _this = this;

      if ($(_this).find('.click-effect').length > 0) {
        return;
      }

      let pX = e.pageX,
        pY = e.pageY,
        oX = parseInt($(this).offset().left),
        oY = parseInt($(this).offset().top);

      $(this).append('<span class="beetobee-purple-dark-bg click-effect x-' + oX + ' y-' + oY + '" style="margin-left:' + (pX - oX) + 'px;margin-top:' + (pY - oY) + 'px;"></span>');
      $('.x-' + oX + '.y-' + oY + '').animate({
        "width": "200px",
        "height": "200px",
        "top": "-250px",
        "left": "-250px"
      }, {
        "duration": 1200,
        "easing": "easeOutSine"
      });

      $('.materialContainer-action', _this).hide();

      $("button", this).addClass('active');
    });

    $('.material-button').on('click', function (e) {
      if (e.originalEvent) {
        e.preventDefault();
      }
    });

    $(".shape").click(function(e) {
      e.preventDefault();

      let _this = this;

      if ($(this).parent().hasClass('material-button')) {
        setTimeout(function() {
          $(".overbox").css({
            "overflow": "hidden"
          });

          $(".box").addClass("back");
        }, 200);

        $(this).parent().addClass('active').animate({
          "width": "950px",
          "height": "950px"
        });

        setTimeout(function() {
          $(_this).css({
            "width": "50%",
            "height": "50%",
            "transform": "rotate(45deg)"
          });

          $(".overbox .title").fadeIn(300);
          $(".overbox .input").fadeIn(300);
          $(".overbox .button").fadeIn(300);

          $(_this).addClass('active');
        }, 800);

        $(this).parent().removeClass('material-button');
      } else {
        $(_this).css({
          "width": "100%",
          "height": "100%"
        });

        setTimeout(function() {
          $(_this).css({
            "transform": "rotate(0deg)"
          });
        }, 800);

        setTimeout(function() {
          $(".overbox").css({
            "overflow": "initial"
          });
        }, 600);

        $(this).parent().animate({
          "width": "70px",
          "height": "70px"
        }, 500, function() {
          $(".box").removeClass("back");

          $(this).removeClass('active')
        });

        $(".overbox .title").fadeOut(300);
        $(".overbox .input").fadeOut(300);
        $(".overbox .button").fadeOut(300);

        $(".alt-2").addClass('material-buton');
        $(_this).removeClass('active');
      }

      if ($(".alt-2").hasClass('material-buton')) {
        $(".alt-2").removeClass('material-buton');
        $(".alt-2").addClass('material-button');
      }
    });

    // $('.modal').modal({
    //   dismissible: true, // Modal can be dismissed by clicking outside of the modal
    //   opacity: .5, // Opacity of modal background
    //   inDuration: 300, // Transition in duration
    //   outDuration: 200 // Transition out duration
    // });


  }

}
