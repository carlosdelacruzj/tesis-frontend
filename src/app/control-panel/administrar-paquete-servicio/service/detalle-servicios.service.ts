import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Detalle, Detalle2 } from '../model/detalle-servicios.model';

@Injectable({
    providedIn: 'root'
  })
  export class EventoAllServiciosService {
  
      selectProyecto: Detalle = {
      ID:0,
      Servicio: 0,
      Evento: 0,
      Precio: 0,
      Descripcion: "",
      Titulo: ""
    };

    selectProyecto2: Detalle2 = {
      servicio: 0,
      titulo: "",
      precio: 0,
      concepto: "",
      id: 0
    };
  

    private API_PRUEBA = 
    'https://tp2021database.herokuapp.com/servicio/consulta/getAllServicios';
    constructor(private http: HttpClient) {}
    
    public registro(data:any): Observable<any> {

      console.log(data);
  
      const url = 'https://tp2021database.herokuapp.com/eventos_servicios/registro/postEventoxServicio';
      return this.http.post(url, data);
    }

    public getAllNombresID(id: any): Observable<any> {
      return this.http.get('https://tp2021database.herokuapp.com/eventos_servicios/consulta/getEventoxServicioById/'+ id);
    }
    

    public registro2(data:any): Observable<any> {

      console.log(data);
  
      const url = 'https://tp2021database.herokuapp.com/eventos_servicios/actualiza/putByIdEventoxServicio';
      return this.http.put(url, data);
    }


    public getAllServicios(): Observable<any> {
      return this.http.get(this.API_PRUEBA);
    }
  }