import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrato } from '../model/contrato.model';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

selectContrato: Contrato = {
        ID:         0,
        Nombre:     '',
        Fecha:      '',
        Servicio:   '',
        Evento:     '',
        Cliente:    '',
        Estado:     '',
        EstadoPago: '',
};

  private API_PRUEBA =
    'https://tp2021database.herokuapp.com/contrato/consulta/getAllContratos';
  selectPedido2: any;
  constructor(private http: HttpClient) {}

  public getAllContratos(): Observable<any> {
    return this.http.get(this.API_PRUEBA);
  }
}

