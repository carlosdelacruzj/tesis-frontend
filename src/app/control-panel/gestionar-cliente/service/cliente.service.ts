import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

selectCliente: Cliente = {
  ID: 0,
  nombre: '',
  apellido: '',
  correo: '',
  celular: '',
  doc: '',
  direccion: '',
  estado: '',
  ECli_Nombre: ''
};

  private API_PRUEBA =
    'https://tp2021database.herokuapp.com/cliente/consulta/getAllCliente';
  constructor(private http: HttpClient) {}

  public getAllClientes(): Promise<any> {
    return this.http.get(this.API_PRUEBA).toPromise();
  }

  public addCliente(data:any): Observable<any> {
    const url = 'https://tp2021database.herokuapp.com/cliente/registro/postCliente';
    return this.http.post(url, data);
  }

  public getByIdCliente(id:any): Observable<any>{
    return this.http.get('https://tp2021database.herokuapp.com/cliente/consulta/getByIdCliente/'+id);
  }

  public putClienteById(data: any): Observable<any> {
    const url = 'https://tp2021database.herokuapp.com/cliente/actualiza/putClienteById';
    return this.http.put<any>(url, data);
  }
}
