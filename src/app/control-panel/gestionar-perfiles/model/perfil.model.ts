export class Perfil {
    constructor(
        public ID: number,
        public ROL: string,
        public nombre: string,
        public apellido: string,
        public correo: string,
        public celular: string,
        public doc: string,
        public direccion: string,
    ) { }
}