import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto, DatosCliente, Eventos, Servi } from '../model/pedido.model';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  selectProyecto: Proyecto = {

    ID: 0,
    Nombre: '',
    Fecha: '',
    Servicio: '',
    Evento: '',
    Cliente: '',
    Estado: '',
  };
  selectCliente: DatosCliente = {


    Nombre: '',
    Apellido: '',
    Cod_Cli: 0

  };

  selectServicios: Servi = {

    ID: 0,
    Nombre: ''
  };

  selectEventos: Eventos = {

    PK_E_Cod: 0,
    E_Nombre: ''

  };


  // selectEventosxServicios: EventServi = {
  //   ID: 0,
  //   Evento: '',
  //   Servicio: '',
  //   Precio: 0,
  //   Descripcion: '',
  //   Titulo: '',
  // };

  private API_PRUEBA =
    'https://tp2021database.herokuapp.com/pedido/consulta/getAllPedido';
  private API_N_Pedido =
    'https://tp2021database.herokuapp.com/pedido/consulta/getIndexPedido';

  private API_DNI =
    'https://tp2021database.herokuapp.com/cliente/consulta/getDataCliente/';

  private API_SERVICIOS =
    'https://tp2021database.herokuapp.com/servicio/consulta/getAllServicios';

  private API_EVENTOS =
    'https://tp2021database.herokuapp.com/eventos/consulta/getAllEventos';

  // private API_SERVICIOSxEVENTOS =
  //   'https://tp2021database.herokuapp.com/eventos_servicios/consulta/getAllServiciosByEventoServ/';

  constructor(private http: HttpClient) { }


  public getAllNombres(): Observable<any> {
    return this.http.get(this.API_PRUEBA);
  }
  public getDni(id: any): Observable<any> {
    return this.http.get(this.API_DNI + id)
  }
  public getN_Pedido(): Observable<any> {
    return this.http.get(this.API_N_Pedido);
  }
  public getServicios(): Observable<any> {
    return this.http.get(this.API_SERVICIOS);
  }
  public getEventos(): Observable<any> {
    return this.http.get(this.API_EVENTOS);
  }
  // public getEventServicios(): Observable<any> {
  //   return this.http.get(this.API_SERVICIOSxEVENTOS);
  // }

}
