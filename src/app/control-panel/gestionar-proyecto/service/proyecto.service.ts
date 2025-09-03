import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto, ProyectoListar } from '../model/proyecto.model';

@Injectable({
  providedIn: 'root',
})
export class ProyectoService {
  selectProyecto: Proyecto = {
    PK_Pro_Cod: 0,
    Pro_Nombre: '',
    FK_P_Cod: 0,
    EPro_Fecha_Inicio_Edicion: '',
    Pro_Fecha_Fin_Edicion: '',
    Pro_Revision_Edicion: 0,
    Pro_Revision_Multimedia: 0,
    Pro_Enlace: '',
    Pro_Asignado: 0,
    FK_ESPro_Cod: 0,
    Pro_Observacion: '',
  };

  selectListar: ProyectoListar = {
    finFecha: "",
    multimedia: 0,
    edicion: 0,
    enlace: "",
    Observacion: "",
    id: 115
  };

  proyecto: Proyecto[] = [];
  private API_PRUEBA = 'https://tp2021database.herokuapp.com/proyecto/';
  constructor(private http: HttpClient) { }

  public getAllNombres(): Observable<any> {
    return this.http.get(this.API_PRUEBA + 'consulta/getAllProyecto');
  }

  public registro(data: any): Observable<any> {

    console.log('Probando');

    const url = 'https://tp2021database.herokuapp.com/proyecto/registro/postProyecto';
    return this.http.post(url, data);
  }
  public getById(id: number): Observable<any> {
    return this.http.get('https://tp2021database.herokuapp.com/pedido/consulta/getByIDPedido/' + `${id}`);
  }

  public getProyectoID(id: number): Observable<any> {
    return this.http.get(this.API_PRUEBA + 'consulta/getByIdProyecto/' + id);
  }

  public updateProyecto(Proyecto1: ProyectoListar) {

    return this.http.put(`https://tp2021database.herokuapp.com/proyecto/actualiza/putProyectoById`, Proyecto1);
  }
}
