import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clazz } from './clazz';

@Injectable({
  providedIn: 'root'
})
export class ClazzService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public addClass(headers, clazz: Clazz): Observable<Clazz> {
    return this.http.post<Clazz>(`${this.apiServerUrl}/class/add`, clazz, {headers});
  }

  public getSchedule(headers, userId: number): Observable<Clazz[]> {
    return this.http.get<Clazz[]>(`${this.apiServerUrl}/class/schedule/${userId}`, {headers});
  }

  public getScheduleByGroup(headers, groupId: number): Observable<Clazz[]> {
    return this.http.get<Clazz[]>(`${this.apiServerUrl}/class/scheduleByGroup/${groupId}`, {headers});
  }
}
