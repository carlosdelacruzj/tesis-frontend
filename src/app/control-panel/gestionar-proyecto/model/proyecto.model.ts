export class Proyecto {
  constructor(public PK_Pro_Cod: number,
    public Pro_Nombre: string,
    public FK_P_Cod: number,
    public EPro_Fecha_Inicio_Edicion: string,
    public Pro_Fecha_Fin_Edicion: null | string,
    public Pro_Revision_Edicion: number,
    public Pro_Revision_Multimedia: number,
    public Pro_Enlace: string,
    public Pro_Asignado: number,
    public FK_ESPro_Cod: number,
    public Pro_Observacion: string
  ) { }
}

export class ProyectoListar {
  constructor(
  public      finFecha: string,
  public     multimedia: number,
  public     edicion: number,
  public     enlace : string,
  public     Observacion : string,
  public     id : number,
  ) {}
    
}