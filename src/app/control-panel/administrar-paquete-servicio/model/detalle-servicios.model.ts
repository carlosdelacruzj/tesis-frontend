export class Detalle {
    constructor(
        public ID: number,
        public Servicio: number,
        public Evento: number,
        public Precio: number,
        public Descripcion: string,
        public Titulo: string
    ){}
  }

  export class Detalle2 {
    constructor(
        public servicio: number,
        public titulo: string,
        public precio: number,
        public concepto: string,
        public id: number,
    ){}
  }