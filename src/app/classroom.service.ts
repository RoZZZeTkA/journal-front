import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Classroom } from './classroom';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getClassrooms(headers): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(`${this.apiServerUrl}/room/all`, {headers});
  }

  public addClassroom(headers, classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(`${this.apiServerUrl}/room/add`, classroom, {headers});
  }
}
