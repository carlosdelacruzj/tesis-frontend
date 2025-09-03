export type StringMap = Record<string, string>; // o { [key: string]: string }

export class EquipoTipoAll {
  //Filtro
  constructor(public PK_TE_Cod: number, public TE_Nombre: string) {}
}

export class EquipoAll {
  constructor(
    public Nombre: string,
    public Marca: string,
    public Modelo: string,
    public Estado: string
  ) {}
}
//Como manejaria el estado?
export class EquipoTipoAllID {
  //Filtro
  constructor(
    public Codigo: string,
    public Marca: string,
    public Modelo: string,
    public Estado: string
  ) {}
}
export class EquipoTipoAllIDMARCAMODELO {
  //Filtro 3 ids
  constructor(
    public Equipo: String,
    public Marca: string,
    public Modelo: string,
    public Serie: String,
    public Fecha: String,
    public Estado: string
  ) {}
}
export class EquipoAllGroup {
  //PRIMERA VISTA | EQUIPO MARCA MODELO ¿VER?
  constructor(
    public Equipo: string,
    public Marca: string,
    public Modelo: string,
    public IdEquipo: number,
    public IdMarca: number,
    public IdModelo: number,
    public Cantidad: number
  ) {}
}

export class EquipoAllMARCA {
  //Filtro
  constructor(public Id: number, public Nombre: string) {}
}

export class EquipoAllMarcaTipo {
  //Filtro
  constructor(public Id: number, public Nombre: string) {}
}

export class EquipoRegistrar {
  //registrar nuevo equipo
  constructor(
    public idEquipo: string,
    public fecha: string,
    public modelo: number
  ) {}
}

export class countEstadosPorModelo {
  constructor(
    public Disponible: number,
    public EnUso: number,
    public Mantenimiento: number,
    public NoDisponible: number
  ) {}
}

export class updateStatus {
  constructor(public idEquipo: string) {}
}

export class existeSerie {
  constructor(public existe: number) {}
}

export class equiposAlquilados {
  constructor(
    public tipoEquipo: string,
    public serie: string,
    public proyectoAsig: string,
    public empleadoAsig: string,
    public estado: string,
    public id: number
  ) {}
}

export class detalleEquipoAlquilado {
  constructor(
    public tipoEquipo: string,
    public marca: string,
    public modelo: string,
    public serie: string,
    public fechaEntrada: string,
    public fechaSalida: string,
    public estado: string,
    public proyectoAsig: string,
    public empleadoAsig: string,
    public id: number
  ) {}
}

export class rAlquilado {
  constructor(
    public tipoEquipo: string,
    public marca: string,
    public modelo: string,
    public serie: string,
    public fechaEntrada: string,
    public fechaSalida: string,
    public fk_Pro_Cod: number,
    public fk_Empleado_Cod: number,
    public estado: string
  ) {}
}

export class lProyectos {
  constructor(
    public ID: number,
    public Nombre: string,
    public Fecha: string,
    public Servicio: string,
    public Evento: string,
    public Estado: number
  ) {}
}

export class empleadosAll {
  constructor(
    public ID: number,
    public Nombre: string,
    public Apellido: string,
    public Car_Nombre: string,
    public DNI: string,
    public Celular: string,
    public Correo: string,
    public Autonomo: number,
    public Cargo: string,
    public Estado: string
  ) {}
}

export class updateAlquilados {
  constructor(
    public proyecto: number,
    public fechaSalida: string,
    public empleado: number,
    public codigo: number
  ) {}
}
