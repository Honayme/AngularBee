import { Component, OnInit } from '@angular/core';
import {Users} from '../users';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../profile.service';
import {DomSanitizer} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TrainingService} from '../../trainings/training.service';
import {forEach} from '@angular/router/src/utils/collection';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  Profile: Users;
  updateProfile: Users;
  profileForm: FormGroup;
  picture = '';

  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passPattern = /^(?=.*\d).{4,8}$/;

  trainings: any = [];


  constructor(private route: ActivatedRoute,
              private profileService: ProfileService,
              private trainingService: TrainingService,
              public sanitize: DomSanitizer,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {

    $(document).ready(function(){
      $('.tabs').tabs();
    });

    this.profileService.getProfile().subscribe(profile => {
      this.Profile = profile;
      console.log(profile);
    });

/*    this.trainingService.getUserTraining().subscribe(trainings => {
      this.trainings = trainings;
      console.log(this.trainings);
    });*/

    this.trainingService.userParticipateTraining().subscribe(trainings => {
      this.trainings = trainings;

      console.log(this.trainings[0].training.name);
      console.log(this.trainings[0]);
      console.log(this.trainings);
    });

    this.profileForm = this.fb.group({
      firstname: ['', []],
      lastname: ['', []],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.pattern(this.passPattern)]],
      passwordConfirm: ['', []],
      birthdate: ['', []],
      profilePicture: ['', []],
      country: ['', []],
      city: ['', []],
      university: ['', []],
      speciality: ['', []],
      levelDegree: ['', []]
    });

    this.updateProfile = new Users('', '', '', '', '', '', '', '', '', '', '', '');

    this.profileService.getProfile().subscribe((user: Users) => {
      this.updateProfile.id = user.id;
      this.picture = user.profilePicture;

      this.profileForm.patchValue({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        passwordConfirm: user.password,
        birthdate: user.birthdate,
        country: user.country,
        city: user.city,
        university: user.university,
        speciality: user.speciality,
        levelDegree: user.levelDegree
      });
    });
  }

  save() {
    this.updateProfile = Object.assign(this.updateProfile, this.profileForm.value);
    this.updateProfile.profilePicture = this.picture;
    this.profileService.updateProfile(this.updateProfile).subscribe(profile => {
    });
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0],
      myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.picture = myReader.result as string;
    };
    myReader.readAsDataURL(file);
  }

}
