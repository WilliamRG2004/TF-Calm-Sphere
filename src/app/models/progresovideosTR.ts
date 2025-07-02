import { SesionTerapia } from "./sesionTerapia";
import { VideosTecnicasRespiracion } from "./videosTecnicaRespiracion";


export class ProgresovideosTR {
  idProgresovideosTR: number = 0;
  fechacompletado: Date = new Date();
  completado: boolean = false;
  sesionTerapia: SesionTerapia=new SesionTerapia();
  videosTecnicasRespiracion: VideosTecnicasRespiracion=new VideosTecnicasRespiracion(); 
}
