import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from './group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getGroups(headers): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiServerUrl}/group/all`, {headers});
  }

  public getGroupById(headers, id: number): Observable<Group> {
    return this.http.get<Group>(`${this.apiServerUrl}/group/find/${id}`, {headers});
  }

  public addGroup(headers, group: Group): Observable<Group> {
    return this.http.post<Group>(`${this.apiServerUrl}/group/add`, group, {headers});
  }

  // public setGroup(headers): Observable<Group> {
  //   return this.http.put<Group>(`${this.apiServerUrl}/group/set?u=3&g=2`, {headers});
  // }


}
