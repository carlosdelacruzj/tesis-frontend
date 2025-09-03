import { Component, OnInit } from '@angular/core';
import { RegistrarPagoService } from './service/registrar-pago.service';
import { PedidoVoucher } from './model/pedidosvoucher.model';
import { Monto } from './model/monto.model';
import { MetodoPago } from './model/metodopago.model';
import { Voucher } from './model/vouchers.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenDialogComponent } from './open-dialog-img/open-dialog.component'
import {
  MatDialog,
} from '@angular/material/dialog';
@Component({
  selector: 'app-registrar-pago',
  templateUrl: './registrar-pago.component.html',
  styleUrls: ['./registrar-pago.component.css'],
})
export class RegistrarPagoComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Proyecto', 'Fecha', 'Editar'];
  displayedColumns2: string[] = [
    'Codigo',
    'Fecha',
    'Monto',
    'Metodo',
    'Imagen',
  ];
  loadingFile = false;
  costo = 's./12.00';
  estado = 'Aceptado';
  pedidosContratados: PedidoVoucher[] = [];
  pedidosPagados: PedidoVoucher[] = [];
  pedidosPendientes: PedidoVoucher[] = [];
  informacionPagos: Monto[] = [];
  vouchersPago: Voucher[] = [];
  metodosPago: MetodoPago[] = [];
  monto = {
    total: 0,
    abonado: 0,
    pendiente: 0,
  };
  idPedido = 0;
  detallePedido = false;
  listadoPedidos = true;
  selectedFile = null;
  montoAbonado = 0;
  metodoPago = null;
  mensajeMonto = false;
  mensajeMetodo = false;
  mensajeArchivo = false;
  mensajeExceso = false;
  durationInSeconds = 5;
  constructor(
    private service: RegistrarPagoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listadoPedidos = true;
    this.detallePedido = false;
    this.getPedidosContratados();
    this.getPedidosPagados();
    this.getPedidosPendientes();
  }

  async getPedidosContratados() {
    this.service.getPedidosContratados().subscribe((response: any) => {
      this.pedidosContratados = response;
    });
  }

  async getPedidosPagados() {
    this.service.getPedidosPagados().subscribe((response: any) => {
      this.pedidosPagados = response;
    });
  }
  async getPedidosPendientes() {
    this.service.getPedidosPendientes().subscribe((response: any) => {
      this.pedidosPendientes = response;
    });
  }

  async getVoucherPedido(id: number) {
    this.service.getVoucherPedido(id).subscribe((response: any) => {
      this.monto.abonado = response[0].MontoAbonado;
      this.monto.total = response[0].CostoTotal;
      this.monto.pendiente = this.monto.total - this.monto.abonado;
    });
  }

  async getMetodosPago() {
    this.service.getMetodosPago().subscribe((response: any) => {
      this.metodosPago = response;
    });
  }

  async getVouchers(id: number) {
    this.service.getVouchersPedido(id).subscribe((response: any) => {
      this.vouchersPago = response;
    });
  }

  getIdPedido(id: number) {
    this.idPedido = id;
    this.listadoPedidos = false;
    this.detallePedido = true;
    this.getMetodosPago();
    this.getVoucherPedido(id);
    this.getVouchers(id);
  }

  mostrarListado() {
    this.listadoPedidos = true;
    this.detallePedido = false;
  }

  asignarTipoEquipo(event: any) {
    this.metodoPago = event;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async uploadFile() {
    this.loadingFile = true;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    let day = dd.toString();
    let month = mm.toString();
    let year = yyyy.toString();
    this.mensajeMonto = false;
    this.mensajeMetodo = false;

    let fecha = year + '-' + month + '-' + day;
    if (this.montoAbonado == 0) {
      this.mensajeMonto = true;
    } else if (this.montoAbonado > this.monto.pendiente) {
      this.mensajeExceso = true;
    } else if (this.metodoPago == null) {
      this.mensajeMetodo = true;
    } else if (this.selectedFile == null) {
      this.mensajeArchivo = true;
    } else {
      this.mensajeMonto = false;
      this.mensajeMetodo = false;
      this.mensajeArchivo = false;
      this.mensajeMetodo = false;
      this.service
        .postPago(
          this.selectedFile,
          this.montoAbonado.toString(),
          fecha,
          this.idPedido.toString(),
          '2',
          '1'
        )
        .then(() => {
          this.loadingFile = false;
          this.okPago();
          this.getVoucherPedido(this.idPedido);
          this.getVouchers(this.idPedido);
          this.getPedidosContratados();
          this.getPedidosPendientes();
          this.getPedidosPagados();
        })
        .catch(() => {
          this.errorPago();
        });
    }
  }

  errorPago() {
    this._snackBar.openFromComponent(errorComponent, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['blue-snackbar'],
    });
  }

  okPago() {
    this._snackBar.openFromComponent(registroComponent, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['blue-snackbar'],
    });
  }

  openImg(link: string) {
    const dialogRef = this.dialog.open(OpenDialogComponent, {
      data: {
        img: link,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'error-pago',
  templateUrl: './messages/error-pago.html',
  styles: [
    `
      .example-pizza-party {
        color: white;
        text-align: center;
      }
    `,
  ],
})
export class errorComponent { }

@Component({
  selector: 'pago-registrado',
  templateUrl: './messages/pago-registrado.html',
  styles: [
    `
      .example-pizza-party {
        color: white;
        text-align: center;
      }
    `,
  ],
})
export class registroComponent { }

@Component({
  selector: 'dialog-content-example-dialog',
  template: '<p>Dialog de prueba</p>',

})
export class DialogContentExampleDialog { }
