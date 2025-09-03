import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../service/pedido.service';
import { VisualizarService } from '../service/visualizar.service';
import { FormGroup,FormControl} from '@angular/forms';
import {DatePipe} from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-pedido',
  templateUrl: './actualizar-pedido.component.html',
  styleUrls: ['./actualizar-pedido.component.css']
})
export class ActualizarPedidoComponent implements OnInit {
  ID=this._route.snapshot.paramMap.get('id');
  minimo: string;
  maximo: string;
  fechaCreate: Date = new Date();
  fechaEvento:any;
  estado:any;
  estados: any[] = [
    { value: '2', viewValue: 'Aceptado' },
    { value: '3', viewValue: 'Cancelado' },
    { value: '4', viewValue: 'En Curso' },
    { value: '5', viewValue: 'Finalizado' },
    { value: '6', viewValue: 'Anulado' },
  ];

  constructor(public pedidoService: PedidoService, private datepipe:DatePipe,
  public visualizarService: VisualizarService,private _route:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.getDetallePedidoView(Number(this.ID));
    this.fechaValidate(this.fechaCreate);
  }
  fechaValidate(date){
    this.minimo= this.addDaysToDate(date, 5);
    this.maximo= this.addDaysToDate(date, 365); }
    convert(str) { 
      var date = new Date(str),
       mnth = ("0" + (date.getMonth() + 1)).slice(-2), 
       day = ("0" + date.getDate()).slice(-2); 
       return [date.getFullYear(), mnth, day].join("-"); }
  
    addDaysToDate(date, days){
        var res = new Date(date);
        res.setDate(res.getDate() + days);
       return this.convert(res);}
  getDetallePedidoView(ID:Number) {
    
    this.visualizarService.getPedidoID(ID).subscribe(
      response =>{
        
        this.visualizarService.selectProyecto=response[0];
        this.visualizarService.selectProyecto.F_Evento = (response[0].F_Evento).split("-").reverse().join("-");
        this.estado=response[0].EstadoPedido
        this.fechaEvento=(response[0].F_Evento);
    });
  }
  putPedido(){
    let idEstado =this.estados.find(e => e =this.visualizarService.selectProyecto.EstadoPedido)
    
    let data={
        'EP_Cod': (Number)(this.visualizarService.selectEditarPedido.EP_Cod)!= 0 ? (Number)(this.visualizarService.selectEditarPedido.EP_Cod): (Number)(idEstado.value),
        'fecha': this.visualizarService.selectProyecto.F_Evento,
        'hora': this.visualizarService.selectProyecto.Hora_Evento,
        'ubicacion': this.visualizarService.selectProyecto.Ubicacion,
        'lugar': this.visualizarService.selectProyecto.Ubicacion, 'latitud': null,'longitud': null,'fecha2': this.visualizarService.selectProyecto.F_Evento2,
        'hora2': this.visualizarService.selectProyecto.Hora_Evento2,'ubicacion2': this.visualizarService.selectProyecto.Ubicacion2, 'lugar2': this.visualizarService.selectProyecto.Ubicacion2, 'latitud2': null,
        'longitud2': null, "id": (Number)(this.ID)
    }
    this.visualizarService
      .putPedido(data)
      .subscribe(
        (res) => { swal.fire({
          text: 'Actualización exitoso',
          icon: 'success',
          showCancelButton: false,
          customClass: {
              confirmButton: 'btn btn-success',},
          buttonsStyling: false
      });},
        (err) => {console.error(err)
          swal.fire({
            text: 'Ocurrió un error, volver a intentar.',
            icon: 'warning',
            showCancelButton: false,
            customClass: {
                confirmButton: 'btn btn-warning',},
            buttonsStyling: false
        });});
  }

}
