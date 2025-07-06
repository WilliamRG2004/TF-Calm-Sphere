import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReporteTecnicaMeditacionComponent } from "./reporte-tecnica-meditacion/reporte-tecnica-meditacion.component";

@Component({
  selector: 'app-reporte',
  imports: [RouterOutlet, ReporteTecnicaMeditacionComponent],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {
  constructor(public route:ActivatedRoute){}
}
