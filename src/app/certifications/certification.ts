import {Time} from '@angular/common';

export class Certification {
  id: number;
  title: string;
  editor: string;
  expertiseField: string;
  desc: string;
  validity: string;
  cost: string;
  costHt: string;
  costTtc: string;
  examDetail: string;
  examDuration: Time;
  examNumber: string;


  constructor(id, title, editor, expertiseField, desc, validity, cost, costHt, costTtc, examDetail, examDuration, examNumber) {
    this.id = id;
    this.title = title;
    this.editor = editor;
    this.expertiseField = expertiseField;
    this.desc = desc;
    this.validity = validity;
    this.cost = cost;
    this.costHt = costHt;
    this.costTtc = costTtc;
    this.examDetail = examDetail;
    this.examDuration = examDuration;
    this.examNumber = examNumber;
  }
}
