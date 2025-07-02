// src/app/models/pagos.ts
import { Users } from './users';

export class Pagos {
  idPagos: number = 0;
  tipoPago: string = '';
  fechaPago: Date = new Date();
  users: Users = new Users();
}
