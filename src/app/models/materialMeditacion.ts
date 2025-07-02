import { TecnicaMeditacion } from "./tecnicaMeditacion";
import { TipoMaterial } from "./tipoMaterial";


export class MaterialMeditacion {
  idMaterialMeditacion: number = 0;
  nombreMaterialMeditacion: string = '';
  urlMaterialMeditacion: string = '';
  descripcionMaterialMeditacion: string = '';

  tecnicaMeditacion: TecnicaMeditacion =new TecnicaMeditacion();
  tipoMaterial: TipoMaterial=new TipoMaterial();   
}
