import { Component, OnInit } from '@angular/core';
import {Users} from '../users';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../profile.service';
import {DomSanitizer} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  Profile: Users;
  // updateProfile: Users;
  profileForm: FormGroup;
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passPattern = /^(?=.*\d).{4,8}$/;


  constructor(private route: ActivatedRoute,
              private profileService: ProfileService,
              public sanitize: DomSanitizer,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.profileService.getProfile().toPromise().then(profile => {
      this.Profile = profile;
      console.log(profile);
    });

    this.profileForm = this.fb.group({
      profilePicture: ['', []],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      lastname: ['', []],
      firstname: ['', []],
      birthdayDate: ['', []],
      password: ['', [Validators.required, Validators.pattern(this.passPattern)]],
      passwordConfirm: ['', []],
      city: ['', []],
      university: ['', []],
      speciality: ['', []],
      levelDegree: ['', []]
    });

    // this.updateProfile = new Users(
    //   '',
    //   '',
    //   '',
    //   '',
    //   '',
    //   '',
    //   '',
    //   '',
    //   '',
    //   '',
    //   '',
    //   '',
    //   );

    this.profileForm.patchValue({
      profilePicture: this.Profile.profilePicture,
      email: this.Profile.email,
      lastname: this.Profile.lastname,
      firstname: this.Profile.firstname,
      birthdate: this.Profile.birthdate,
      city: this.Profile.city,
      university: this.Profile.university,
      speciality: this.Profile.speciality,
      levelDegree: this.Profile.levelDegree
    });



  }

  save() {
    this.profileService.updateProfile(this.profileForm).subscribe(profile => {
      this.router.navigate(['/profile']);
    });
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0],
      myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.picture = myReader.result;
    };
    myReader.readAsDataURL(file);
  }

}
