export class Contrato {
    constructor(
        public ID:         number,
        public Nombre:     string,
        public Fecha:      string,
        public Servicio:   string,
        public Evento:     string,
        public Cliente:    string,
        public Estado:     string,
        public EstadoPago: string,
    ) { }
  }