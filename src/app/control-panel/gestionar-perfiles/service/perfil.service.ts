import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil } from '../model/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  selectPerfil: Perfil = {
    ID: 0,
    ROL: '',
    nombre: '',
    apellido: '',
    correo: '',
    celular: '',
    doc: '',
    direccion: '',
  };
  
    private API_PRUEBA =
      'https://tp2021database.herokuapp.com/perfiles/consulta/getAllPerfiles';
    constructor(private http: HttpClient) {}
  
    public getAllPerfiles(): Promise<any> {
      return this.http.get(this.API_PRUEBA).toPromise();
    }

    public getAllRoles(): Observable<any> {
      const url = 'https://tp2021database.herokuapp.com/perfiles/consulta/getAllRoles';
      return this.http.get(url);
    }
  
    public postPermiso(data:any): Observable<any> {
      const url = 'https://tp2021database.herokuapp.com/perfiles/registro/postPermiso';
      return this.http.post(url, data);
    }
  
    public getByIdPerfil(id:any): Observable<any>{
      return this.http.get('https://tp2021database.herokuapp.com/perfiles/consulta/getByIdPerfil/'+id);
    }
  
    public putPermiso(data: any): Observable<any> {
      const url = 'https://tp2021database.herokuapp.com/perfiles/actualiza/putPermiso';
      return this.http.put<any>(url, data);
    }
}
