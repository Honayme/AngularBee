import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TrainingService} from '../../training.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Training} from '../../training';
declare var $: any;

@Component({
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  idTraining = this.route.snapshot.params['id'];
  training: Training;
  isSubscribe = false;

  constructor(private route: ActivatedRoute,
              public trainingService: TrainingService,
              public  sanitize: DomSanitizer,
              private router: Router) { }

  ngOnInit() {
    this.trainingService.getDetail((this.idTraining)).subscribe(training => {
      this.training = training;
      console.log(training);
    });

    this.trainingService.isSubscribe((this.idTraining)).subscribe(isSubscribe => {
      this.isSubscribe = isSubscribe;
    });

    $('#modal-add-training').modal();
  }

  public openModalAdd() {
    $('#modal-add-training').modal('open');
  }

  subscribe() {
    this.trainingService.subscribeTraining(this.idTraining).subscribe(participate => {
      this.training = participate;
      this.isSubscribe = true;
      // this.trainingsChange.emit(this.trainings);
      console.log('participate');
    });
  }

  unsubscribe() {
    this.trainingService.unsubscribeTraining(this.idTraining).subscribe(participate => {
      this.training = participate;
      this.isSubscribe = false;
      console.log('not participate');
    });
  }

  delete() {
    this.trainingService.deleteTraining(this.idTraining).subscribe( boolean => {
      this.router.navigate(['/formations']);
      console.log('training has been deleted');
    });
  }
}
