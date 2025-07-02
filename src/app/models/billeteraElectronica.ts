import { Pagos } from "./pagos";

export class BilleteraElectronica {
  idBilleteraElectronica: number = 0;
  companiaBilleteraElectronica: string = '';
  imagenQRBilleteraElectronica: string = '';
  evidenciaBilleteraElectronica: string = '';
  pagos: Pagos=new  Pagos();
}