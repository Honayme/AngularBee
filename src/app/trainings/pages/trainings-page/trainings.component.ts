import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
