// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost/your-php-backend/api/services.php';

  constructor(private http: HttpClient) { }

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addService(service: any): Observable<any> {
    return this.http.post(this.apiUrl, service);
  }

  updateService(service: any): Observable<any> {
    return this.http.put(`${this.apiUrl}?id=${service.id}`, service);
  }

  deleteService(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`);
  }
}