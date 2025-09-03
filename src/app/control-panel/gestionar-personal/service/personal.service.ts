import { Injectable, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personal, PersonalActualizar, PersonalListar } from '../model/personal.model';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  selectPersonal: Personal = {
        nombre: '',
        apellido: '',
        correo : '',
        celular : '',
        doc : '',
        direccion : '',
        autonomo: 0,
        cargo: 0,
        estado:0
  };
  selectListar: PersonalListar = {
      ID:0,
      Nombres: '',
      Apellidos: '',
      DNI : '',
      Celular : '',
      Correo : '',
      Autonomo : 0,
      Cargo: '',
      Estado :'',
      Direccion:''
    
};
  private  URL_API = 'https://tp2021database.herokuapp.com/empleado/';

 
  constructor(private http: HttpClient) {}

  public createEmpleado(data:any): Observable<any> {
    return this.http.post(this.URL_API+'registro/postEmpleado',data);
  }

  public getEmpleados(): Observable<any> {
    return this.http.get(this.URL_API+'consulta/getAllEmpleadosList');
  }

  public getEmpleadoID(id: any): Observable<any> {
    
    return this.http.get(this.URL_API+'consulta/getEmpleadoByID/'+ `${id}`);
    
  }
  public getCargos(): Observable<any> {
    return this.http.get(this.URL_API+'consulta/getAllCargo');
  }
  public updateEmpleado(Personal:PersonalActualizar) {
    
    return this.http.put(this.URL_API+'actualiza/putEmpleadoById',Personal);
  }  
}