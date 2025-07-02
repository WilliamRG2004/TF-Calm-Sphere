import { MusicaRelajacion } from "./musicaRelajacion";
import { SesionTerapia } from "./sesionTerapia";


export class ProgresomusicaS {
  idProgresomusicaS: number = 0;
  fechacompletado: Date = new Date();
  completado: boolean = false;
  sesionTerapia: SesionTerapia=new SesionTerapia();  
  musicaRelajacion: MusicaRelajacion=new MusicaRelajacion() ; 
}
