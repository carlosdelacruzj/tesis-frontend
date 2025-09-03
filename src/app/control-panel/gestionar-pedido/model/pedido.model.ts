export class Proyecto {
  constructor(

    public ID: number,
    public Nombre: String,
    public Fecha: string,
    public Servicio: String,
    public Evento: String,
    public Cliente: String,
    public Estado: String,

  ) { }
}
export class DatosCliente {
  constructor(
    public Nombre: String,
    public Apellido: String,
    public Cod_Cli: number
  ) {

  }
}
export class Servi {
  constructor(
    public ID: number,
    public Nombre: String
  ) {

  }
}

export class Eventos {
  constructor(

    public PK_E_Cod: number,
    public E_Nombre: String

  ) {

  }
}
// export class EventServi{
//   constructor(
// public ID : number,
// public Evento : string,
// public Servicio : String,
// public Precio : number,
// public Descripcion : String,
// public Titulo : String,

//   ){

//   }
// }

