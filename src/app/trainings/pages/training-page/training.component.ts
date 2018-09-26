import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrainingService} from '../../training.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  training = [];

  constructor(private route: ActivatedRoute,
              private trainingService: TrainingService,
              public  sanitize: DomSanitizer) { }

  ngOnInit() {
    this.trainingService.getDetail((this.route.snapshot.params['id'])).subscribe(training => {
      this.training = training;
      console.log(this.route.snapshot.params['id']);
    });
  }

}
