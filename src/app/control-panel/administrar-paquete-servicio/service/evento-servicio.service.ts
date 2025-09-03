import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../model/evento-servicio.model';

@Injectable({
  providedIn: 'root'
})
export class EventoServicioService {

  selectProyecto: Servicio = {
    ID: 0,
    Evento: '',
    Servicio: '',
    Precio: 0,
    Descripcion: '',
    Titulo: ''
  };

  private API_PRUEBA = 
  'https://tp2021database.herokuapp.com/eventos_servicios/consulta/getAllServiciosByEvento';
  constructor(private http: HttpClient) {}

  
  public api(id: number): Observable<any> {
      const url = `${this.API_PRUEBA}/${id}`
    return this.http.get(url);
  }

  public getAllNombres2(): Observable<any> {
    return this.http.get(this.API_PRUEBA);
  }

}

