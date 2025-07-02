// src/app/models/tecnica-meditacion.ts
import { Terapia } from './terapia';

export class TecnicaMeditacion {
  idTecnicaMeditacion: number = 0;
  nombreTecnicaMeditacion: string = '';
  descripcionTecnicaMeditacion: string = '';
  terapia: Terapia = new Terapia();
}
