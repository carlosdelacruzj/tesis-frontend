import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  private API_PRUEBA =
  "https://tp2021database.herokuapp.com/proyecto/consulta/getAllEventosProyectos";

  private API_DETALLE =
  "https://tp2021database.herokuapp.com/eventos/consulta/getDetailEvento/";
  constructor(private http: HttpClient) {}

  public getAllEventos(): Promise<any> {
    return this.http.get(this.API_PRUEBA).toPromise();
  }

  public getDetalleID(id : number): Promise<any> {
    return this.http.get(this.API_DETALLE+id).toPromise();
  }
  
}
