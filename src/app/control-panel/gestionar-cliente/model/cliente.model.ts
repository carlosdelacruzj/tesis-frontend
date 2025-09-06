export type EstadoCliente = 'ACTIVO' | 'INACTIVO';

export interface Cliente {
  ID: string;
  nombre: string;
  apellido: string;
  correo: string;
  celular: string;
  doc: string;
  direccion: string;
  estado?: EstadoCliente;
  ECli_Nombre?: string; // compat
  createdAt?: string;   // opcional, si tu back lo manda
  updatedAt?: string;   // opcional
}
