import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from './group';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<User> {
    console.log(user);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post<User>(`${this.apiServerUrl}/login`, "login=" + user.login + "&password=" + user.password, options);
  }

  public getHeaders(){
    return new HttpHeaders().set("Authorization", localStorage.getItem("token") || "{}");
}

  public test(): Observable<string> {
    return this.http.get<string>(`${this.apiServerUrl}/test`);
  }
}
