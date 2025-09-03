export class Pedido {
    constructor(
      public ID: number,
      public Nombre: string,
      public Fecha: string,
      public Servicio: string,
      public Evento: string,
      public Cliente: string,
      public Estado: string,
      public EstadoPago: string
    ) {}
  }
  
  export class Pedido2 {
    constructor(
      public Empleado: string,
      public N_Pedido: number,
      public Cliente: string,
      public F_Registro: string,
      public EstadoPedido: string,
      public Costo_Total: string,
      public Acuenta: string,
      public EstadoPago: string,
      public Evento: string,
      public Servicio: string,
      public F_Evento: string,
      public Hora_Evento: string,
      public Direccion: string,
      public Descripcion: string,
      public NombrePedido: string,
      public correo: string
    ) {}
  }