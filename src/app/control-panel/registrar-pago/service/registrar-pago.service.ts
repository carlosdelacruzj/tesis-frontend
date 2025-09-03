import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrarPagoService {
  private GET_PEDIDOS_PENDIENTES =
    'https://tp2021database.herokuapp.com/voucher/consulta/getAllPedidoVoucher/1';
  private GET_PEDIDOS_CONTRATADOS =
    'https://tp2021database.herokuapp.com/voucher/consulta/getAllPedidoVoucher/2';
  private GET_PEDIDOS_PAGADOS =
    'https://tp2021database.herokuapp.com/voucher/consulta/getAllPedidoVoucher/3';
  private GET_VOUCHER_PEDIDO =
    'https://tp2021database.herokuapp.com/voucher/consulta/getVoucherByPedido/';
  private GET_VOUCHERS =
    'https://tp2021database.herokuapp.com/voucher/consulta/getAllVoucherByPedido/';
  private GET_METODOS =
    'https://tp2021database.herokuapp.com/voucher/consulta/getAllMetodoPago';

  private POST_PAGO = 'https://tp2021database.herokuapp.com/postVoucher';

  constructor(private http: HttpClient) {}

  public getPedidosContratados(): Observable<any> {
    return this.http.get(this.GET_PEDIDOS_CONTRATADOS);
  }
  public getPedidosPendientes(): Observable<any> {
    return this.http.get(this.GET_PEDIDOS_PENDIENTES);
  }

  public getPedidosPagados(): Observable<any> {
    return this.http.get(this.GET_PEDIDOS_PAGADOS);
  }

  public getVoucherPedido(id: number): Observable<any> {
    return this.http.get(this.GET_VOUCHER_PEDIDO + `${id}`);
  }

  public getVouchersPedido(id: number): Observable<any> {
    return this.http.get(this.GET_VOUCHERS + `${id}`);
  }

  public getMetodosPago(): Observable<any> {
    return this.http.get(this.GET_METODOS);
  }

  public postPago(
    selectedFile: any,
    monto: string,
    fechaRegistro: string,
    idPedido: string,
    estadoVoucher: string,
    metodoPago: string
  ) {
    const fd = new FormData();
    fd.append('file', selectedFile, selectedFile.name);
    fd.append('monto', monto);
    fd.append('fechaRegistro', fechaRegistro);
    fd.append('idPedido', idPedido);
    fd.append('estadoVoucher', estadoVoucher);
    fd.append('metodoPago', metodoPago);
    return this.http.post(this.POST_PAGO, fd).toPromise();
  }
}
