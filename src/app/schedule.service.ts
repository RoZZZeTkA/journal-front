import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clazz } from './clazz';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // public getSchedule(headers, userId: number): Observable<Clazz[]> {
  //   return this.http.get<Clazz[]>(`${this.apiServerUrl}/class/schedule/${userId}`, {headers});
  // }
}
