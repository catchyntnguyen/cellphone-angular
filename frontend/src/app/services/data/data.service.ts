import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private jsonUrl = 'assets/data/data.json';
  private apiUrl = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
  registerHandler(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/user/registerHandler", data);
  }
  checkOut(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/checkOut", data);
  }
  updataStatus(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/updateStatus", data);
  }
}
