export class Proyecto {
  constructor(
    public PK_Pro_Cod: number,
    public Pro_Nombre: string,
    public FK_P_Cod: number,
    public EPro_Fecha_Inicio_Edicion: string,
    public Pro_Fecha_Fin_Edicion: string,
    public Pro_Revision_Edicion: number,
    public Pro_Revision_Multimedia: number,
    public Pro_Enlace: string
  ) {}
}

export class Empleado {
  constructor(
    public ID: number,
    public Nombre: string,
    public Apellido: string,
    public Car_Nombre: string
  ) {}
}

export class TipoEquipos {
  constructor(public PK_TE_Cod: number, public TE_Nombre: string) {}
}

export class Equipos {
  constructor(
    public Codigo: number,
    public Marca: string,
    public Modelo: string,
    public Estado: string
  ) {}
}

export class EquiposByProyecto {
  constructor(
    public ID: number,
    public ID_Empleado: number,
    public Empleado: string,
    public CodigoEquipo: string,
    public TipoEquipo: string,
    public NombreEquipo: string
  ) {}
}

export class AsignarEquipos {
  constructor(
    public proyecto: number,
    public empleado: number,
    public equipos: string
  ) {}
}
