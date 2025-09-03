export class Proyecto {
  constructor(

    public Empleado : String,
    public N_Pedido : number,
    public Cliente : String,
    public F_Registro : String,
    public EstadoPedido : String,
    public Costo_Total : number,
    public Acuenta : number,
    public EstadoPago : String,
    public Evento : String,
    public Servicio : String,
    public F_Evento :string,
    public Hora_Evento : String,
    public  Direccion : String,
    public  Descripcion :String,
    public  NombrePedido : String,
    public  Ubicacion :String,
    public Latitud: null,
    public Longitud: null,
    public F_Evento2: String,
    public Hora_Evento2: String,
    public Direccion2: String,
    public Ubicacion2: String,
    public Latitud2: null,
    public Longitud2: null
   

 ){}
}
export class N_Pedido{
  constructor(
    public N_Pedido : number
    ){

  }
}

export class EditarPedido {
  constructor(

    public EP_Cod: number,
    public fecha: string,
    public hora: string,
    public ubicacion:string,
    public lugar: string,
    public latitud: string,
    public longitud: string,
    public fecha2: string,
    public hora2: string,
    public ubicacion2: string,
    public lugar2: string,
    public latitud2: string,
    public longitud2: string,
    public id: number


 ){}}

 export class AgregarPedido {
  constructor(
 
public NombrePedido:string,
public ExS :number,
public doc : string,
public fechaCreate : string,
public fechaEvent : string,
public horaEvent: string,
public CodEmp : number,
public Direccion : string,
public Observacion : string,

 ){}}

 export class EventServi2{
  constructor(
public ID : number,
public Evento : string,
public Servicio : String,
public Precio : number,
public Descripcion : String,
public Titulo : String,

  ){

  }
}