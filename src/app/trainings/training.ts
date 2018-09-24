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
  availableSeat: number;
  picture: string;


  constructor(id, name, description, duration, date, hour, place, totalSeat, availableSeat, picture) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.duration = duration ;
    this.date = date ;
    this.hour = hour ;
    this.place = place ;
    this.totalSeat = totalSeat ;
    this.availableSeat = availableSeat ;
    this.picture = picture ;
  }
}
