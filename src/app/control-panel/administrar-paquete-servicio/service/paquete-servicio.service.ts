import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paquete } from '../model/paquete-servicio.model';

@Injectable({
  providedIn: 'root'
})
export class PaqueteServicioService {

  selectProyecto: Paquete = {
    PK_E_Cod: 0,
    E_Nombre: '',
    E_Enlace: ''
  };

  private API_PRUEBA = 
  'https://tp2021database.herokuapp.com/eventos/consulta/getAllEventos';
  constructor(private http: HttpClient) {}

  public getAllNombres(): Observable<any> {
    return this.http.get(this.API_PRUEBA);
  }
}
