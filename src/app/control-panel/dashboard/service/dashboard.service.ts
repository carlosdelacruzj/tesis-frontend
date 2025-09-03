import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private API_PRUEBA =
  "https://rickandmortyapi.com/api/character";
constructor(private http: HttpClient) {}

public getAllNombres(): Observable<any> {
  return this.http.get(this.API_PRUEBA);
}
}
