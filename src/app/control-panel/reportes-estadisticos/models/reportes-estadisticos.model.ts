export interface Equipos {
  equipo: string;
  modelo: string;
  marca: string;
  cantidad: number;
}

export interface Proyecto {
  mes1: number;
  mes2: number;
  mes3: number;
  mes4: number;
  mes5: number;
  mes6: number;
}

export interface Evento {
  servicio: string;
  evento: string;
  nombre: string;
  cantidad: number;
}

export interface Estados {
  inicializado: number;
  enCurso: number;
  enEdicion: number;
  finalizado: number;
  entregado: number;
  anulado: number;
}

export interface Ganancia {
  gananciaMes1?: number;
  gananciaMes2?: number;
  gananciaMes3?: number;
  gananciaMes4?: number;
  gananciaMes5?: number;
  gananciaMes6?: number;
}

export interface Data {
  name: string;
  value: number;
}
