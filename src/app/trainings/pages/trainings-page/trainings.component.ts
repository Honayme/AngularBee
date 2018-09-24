import { Component, OnInit } from '@angular/core';
import {TrainingService} from '../../training.service';
declare var $: any;

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {

  constructor(private trainingService: TrainingService) { }

  trainings: any = [];

  ngOnInit() {
    this.trainingService.getAll().subscribe(trainings =>{
      this.trainings = trainings;
      console.log(this.trainings);
    });

    $('#modal-add-training').modal();
    $('#modal-ask-for-training').modal();
  }

  private openModalAdd(){
    $("#modal-add-training").modal('open');
  }

  private openModalAsk(){
    $("#modal-ask-for-training").modal('open');
  }


}
