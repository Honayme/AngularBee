import {Time} from '@angular/common';

export class Certification {
  id: number;
  title: string;
  editor: string;
  expertiseField: string;
  desc: string;
  validity: string;
  costHt: string;
  costTtc: string;
  examDetail: string;
  examDuration: Time;
  examNumber: string;
  howToSubscribe: string;
  usefulInfos: string;


  constructor(id, title, editor, expertiseField, desc, validity, costHt, costTtc, examDetail, examDuration, examNumber, howToSubscribe, usefulInfos) {
    this.id = id;
    this.title = title;
    this.editor = editor;
    this.expertiseField = expertiseField;
    this.desc = desc;
    this.validity = validity;
    this.costHt = costHt;
    this.costTtc = costTtc;
    this.examDetail = examDetail;
    this.examDuration = examDuration;
    this.examNumber = examNumber;
    this.howToSubscribe = howToSubscribe;
    this.usefulInfos = usefulInfos;
  }
}
