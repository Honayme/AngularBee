import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainingService} from '../../training.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  idTraining = this.route.snapshot.params['id'];
  training = [];
  isSubscribe = false;

  constructor(private route: ActivatedRoute,
              public trainingService: TrainingService,
              public  sanitize: DomSanitizer,
              private router: Router) { }

  ngOnInit() {
    this.trainingService.getDetail((this.idTraining)).toPromise().then(training => {
      this.training = training;
    });

    this.trainingService.isSubscribe((this.idTraining)).subscribe(isSubscribe => {
      this.isSubscribe = isSubscribe;
    });
  }

  subscribe() {
    this.trainingService.subscribeTraining(this.idTraining).toPromise().then(participate => {
      this.router.navigate(['/formations/detail/' + this.idTraining]);
    });
  }

  unsubscribe() {
    this.trainingService.unsubscribeTraining(this.idTraining).toPromise().then(participate => {
      this.router.navigate(['/formations/detail/' + this.idTraining]);
      console.log('not participate');
    });
  }
}
