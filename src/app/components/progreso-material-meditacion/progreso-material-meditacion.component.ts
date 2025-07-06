import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarprogresomaterialmeditacionComponent } from "./listarprogresomaterialmeditacion/listarprogresomaterialmeditacion.component";

@Component({
  selector: 'app-progreso-material-meditacion',
  imports: [RouterOutlet, ListarprogresomaterialmeditacionComponent],
  templateUrl: './progreso-material-meditacion.component.html',
  styleUrl: './progreso-material-meditacion.component.css'
})
export class ProgresoMaterialMeditacionComponent {
  constructor(public route:ActivatedRoute){}
}
