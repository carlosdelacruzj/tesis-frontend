import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { PedidoService } from './service/pedido.service';
import { VisualizarService } from './service/visualizar.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

interface Car {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-gestionar-pedido',
  templateUrl: './gestionar-pedido.component.html',
  styleUrls: ['./gestionar-pedido.component.css'],
})

export class GestionarPedidoComponent implements OnInit {

  //SELECTEDITARPEDIDO
  cars: Car[] = [
    { value: '1', viewValue: 'Solicitado' },
    { value: '2', viewValue: 'Aceptado' },
    { value: '3', viewValue: 'Cancelado' },
    { value: '4', viewValue: 'En Curso' },
    { value: '5', viewValue: 'Finalizado' },
    { value: '6', viewValue: 'Anulado' },
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild('paginator') paginator!: MatPaginator;
  columnsToDisplay = [
    'ID',
    'Nombre',
    'Fecha',
    'Servicio',
    'Evento',
    'Cliente',
    'Estado',
    'Visualizar',];
 

  //listapedidos&visualizar
  idPedido = 0;
  // VISUALIZAR PEDIDO
  pedido = {
    Empleado: '',
    N_Pedido: 0,
    Cliente: '',
    F_Registro: '',
    EstadoPedido: '',
    Costo_Total: 0,
    Acuenta: 0,
    EstadoPago: '',
    Evento: '',
    Servicio: '',
    F_Evento: '',
    Hora_Evento: '',
    Direccion: '',
    Descripcion: '',
    NombrePedido: ''
  };

  saldo = 0;

  //Modal
  closeResult = '';
  estadoEditado = 0;
  fechaEditada = { day: '', month: '', year: '' };

  horaEditada = '';


  constructor(
    private service: PedidoService,
    private service2: VisualizarService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPedido();
  }
  getPedido() {
    this.service.getAllNombres().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
      //this.pedidos_ready = true;
    })
  }

  // PEDIDOVISUALIZAR
  getPedidoID(valor: number) {
    this.service2.getPedidoID(valor).subscribe((responde) => {
      this.pedido.Empleado = responde[0].Empleado;
      this.pedido.N_Pedido = responde[0].N_Pedido;
      this.pedido.Cliente = responde[0].Cliente;
      this.pedido.F_Registro = responde[0].F_Registro;
      this.pedido.EstadoPedido = responde[0].EstadoPedido;
      this.pedido.Costo_Total = responde[0].Costo_Total;
      this.pedido.Acuenta = responde[0].Acuenta;
      this.pedido.EstadoPago = responde[0].EstadoPago;
      this.pedido.Evento = responde[0].Evento;
      this.pedido.Servicio = responde[0].Servicio;
      this.pedido.F_Evento = responde[0].F_Evento;
      this.pedido.Hora_Evento = responde[0].Hora_Evento;
      this.pedido.Direccion = responde[0].Direccion;
      this.pedido.Descripcion = responde[0].Descripcion;
      this.pedido.NombrePedido = responde[0].NombrePedido;
      this.saldo = this.pedido.Costo_Total - this.pedido.Acuenta;

      console.log(this.service2.getPedidoID(valor));
    });
  }

  // MODAL

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // editarModal() {
  //   let day = this.fechaEditada.day.toString();
  //   let month = this.fechaEditada.month.toString();
  //   let year = this.fechaEditada.year.toString();
  //   let fecha = year + '-' + month + '-' + day;


  //   this.service2.putPedido(this.estadoEditado, fecha, this.horaEditada, this.idPedido).subscribe({
  //     next: (res) => {
  //       alert(JSON.stringify(res));
  //       this.getPedido();
  //       this.getPedidoID(this.idPedido);

  //     },
  //     error: (error) => {
  //       alert(JSON.stringify(error));
  //     },
  //   });

  // }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }
}
