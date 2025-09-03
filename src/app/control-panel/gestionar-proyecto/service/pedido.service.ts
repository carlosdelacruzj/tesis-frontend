import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido, Pedido2 } from '../model/pedido.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  selectPedido: Pedido = {
    ID: 0,
    Nombre: '',
    Fecha: '',
    Servicio: '',
    Evento: '',
    Cliente: '',
    Estado: '',
    EstadoPago: ''
  };
  selectPedido2: Pedido2 = {
    Empleado: '',
    N_Pedido: 0,
    Cliente: '',
    F_Registro: '',
    EstadoPedido: '',
    Costo_Total: '',
    Acuenta: '',
    EstadoPago: '',
    Evento: '',
    Servicio: '',
    F_Evento: '',
    Hora_Evento: '',
    Direccion: '',
    Descripcion: '',
    NombrePedido: '',
  };
  

  pedido: Pedido[] = [];
  pedido2: Pedido2[] = [];
  private API_PRUEBA =
    'https://tp2021database.herokuapp.com/pedido/consulta/getAllPedido';
  constructor(private http: HttpClient) {}

  public getAllNombres(): Observable<any> {
    return this.http.get('https://tp2021database.herokuapp.com/proyecto/consulta/getAllPedidosContratado');
  }

  public getAllNombresID(id: any): Observable<any> {
    return this.http.get('https://tp2021database.herokuapp.com/pedido/consulta/getByIDPedido/'+ id);
  }
}
