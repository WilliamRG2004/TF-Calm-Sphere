// src/app/models/sesion-terapia.ts
import { Users } from './users';
import { Terapia } from './terapia';

export class SesionTerapia {
  idSesion: number;
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  completado: boolean = false;
  usuario: Users;
  terapia: Terapia;
}
