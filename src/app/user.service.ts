import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from './subject';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUsers(headers): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`, {headers});
  }

  public getStudents(headers): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/students`, {headers});
  }

  public getTeachers(headers): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/teachers`, {headers});
  }

  public getUserById(userId: number, headers): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/find/${userId}`, {headers});
  }

  public getUserBySubject(headers, subjectName: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/findBySubject/${subjectName}`, {headers});
  }

  public addUser(headers, user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/user/add`, user, {headers});
  }

  
  public setGroup(headers, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/setGroup`, user, {headers});
  }

  public addSubjectToUser(headers, subject: Subject, userId: number): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/user/addSubject/${userId}`, subject, {headers});
  }
}
