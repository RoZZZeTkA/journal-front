import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Subject } from './subject';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getSubjects(headers): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiServerUrl}/subject/all`, {headers});
  }

  public getSubjectsByUser(headers, userId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiServerUrl}/subject/findByUser/${userId}`, {headers});
  }

  public getSubjectsByUserToAdd(headers, userId: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiServerUrl}/subject/findByUserToAdd/${userId}`, {headers});
  }

  public addSubject(headers, subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(`${this.apiServerUrl}/subject/add`, subject, {headers});
  }
}
