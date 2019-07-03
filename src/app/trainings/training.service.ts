import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Training } from './training';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TrainingService {

  constructor(private http: HttpClient) {
  }

  path = 'http://localhost:3000/api/training';
  pathPart = 'http://localhost:3000/api/participate';

  getAll(): Observable<Training[]> {
    return this.http.get<Training[]>(this.path + '/all');
  }

  getDetail(id: number): Observable<Training> {
    return this.http.get<Training>(this.path + '/detail/' + id);
  }

  getUserTraining(): Observable<Training[]> {
    return this.http.get<Training[]>(this.path + '/trainingUser');
  }

  createTraining(data): Observable<Training> {
    return this.http.post<Training>(this.path + '/create', data);
  }

  updateTraining(data): Observable<Training> {
    return this.http.put<Training>(this.path + '/update' , data);
  }

  deleteTraining(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.path + '/delete/' + id);
  }

  subscribeTraining(id: number): Observable<Training> {
    return this.http.post<Training>(this.pathPart + '/training/subscribe/' + id, '' );
  }

  unsubscribeTraining(id: number): Observable<Training> {
    return this.http.post<Training>(this.pathPart + '/training/unsubscribe/' + id, '' );
  }

  isSubscribe(id: number): Observable<boolean> {
    return this.http.get<boolean>(this.pathPart + '/training/issubscribe/' + id);
  }

  userParticipateTraining(): Observable<any> {
    return this.http.get<any>(this.pathPart + '/training/userTraining');
  }
}
