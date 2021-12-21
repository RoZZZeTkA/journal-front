import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Mark } from './mark';

@Injectable({
  providedIn: 'root'
})
export class MarkService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getMarksByStudent(headers, studentId: number): Observable<Mark[]> {
    return this.http.get<Mark[]>(`${this.apiServerUrl}/mark/findByStudent/${studentId}`, {headers});
  }

  public addMark(headers, mark: Mark): Observable<Mark> {
    return this.http.post<Mark>(`${this.apiServerUrl}/mark/add`, mark, {headers});
  }
}
