export interface Cliente {
  ID: string;           // ← antes number
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  doc: string;          // el back ya responde "doc" (modo compat)
  direccion: string;
  estado?: string;
  ECli_Nombre?: string;
}
