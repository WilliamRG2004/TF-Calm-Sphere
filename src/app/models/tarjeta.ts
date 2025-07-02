// src/app/models/tarjeta.ts

import { Pagos } from "./pagos";


export class Tarjeta {
  idTarjeta: number = 0;
  nombreTitularTarjeta: string = '';
  numeroTarjeta: string = '';
  cvvTarjeta: string = '';
  fechacaducidadTarjeta: string = '';
  pagos: Pagos=new Pagos()
;}
