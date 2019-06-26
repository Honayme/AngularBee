import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {Certification} from './certification';

@Injectable()
export class CertificationService {

  constructor(private http: HttpClient) {
  }

  path = 'http://localhost:3000/api/certifications';

  getAll(): Observable<Certification[]> {
    return this.http.get<Certification[]>(this.path + '/all');
  }

  getDetail(id: number): Observable<Certification[]> {
    return this.http.get<Certification[]>(this.path + '/detail/' + id);
  }

  createCertification(data): Observable<Certification[]> {
    return this.http.post<Certification[]>(this.path + '/create', data);
  }

  updateCertification(data): Observable<Certification> {
    return this.http.put<Certification>(this.path + '/update', data);
  }

  deleteCertification(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.path + '/delete/' + id);
  }
}
