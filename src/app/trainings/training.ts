import {Time} from '@angular/common';

export class Training {
  id: number;
  name: string;
  description: string;
  duration: number;
  date: Date;
  hour: Time;
  place: string;
  totalSeat: number;
  picture: string;
  theme: string;


  constructor(id, name, description, duration, date, hour, place, totalSeat, picture, theme) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.duration = duration ;
    this.date = date ;
    this.hour = hour ;
    this.place = place ;
    this.totalSeat = totalSeat ;
    this.picture = picture ;
    this.theme = theme ;
  }
}
