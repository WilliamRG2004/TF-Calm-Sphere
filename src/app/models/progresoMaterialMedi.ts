import { MaterialMeditacion } from "./materialMeditacion";
import { SesionTerapia } from "./sesionTerapia";


export class ProgresoMaterialMedi {
  idProgresoMaterialMedi: number = 0;
  fechacompletado: Date = new Date();
  completado: boolean = false;
  sesionTerapia: SesionTerapia=new SesionTerapia();
  materialMeditacion: MaterialMeditacion=new MaterialMeditacion();
}
