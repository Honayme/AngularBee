import { Component, OnInit } from '@angular/core';
import {TrainingService} from '../../training.service';
import {DomSanitizer} from '@angular/platform-browser';
declare var $: any;

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {

  constructor(private trainingService: TrainingService,
              public sanitize: DomSanitizer) { }

  trainings: any = [];

  ngOnInit() {
    this.trainingService.getAll().subscribe(trainings => {
      this.trainings = trainings;
      console.log(this.trainings);
    });

    $('#modal-add-training').modal();
    $('#modal-ask-for-training').modal();
  }

  public openModalAdd() {
    $('#modal-add-training').modal('open');
  }

  public openModalAsk() {
    $('#modal-ask-for-training').modal('open');
  }


}
