import { Component } from '@angular/core';
import { ListarprogresomusicarelajacionComponent } from "./listarprogresomusicarelajacion/listarprogresomusicarelajacion.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-progresomusicarelajacion',
  imports: [RouterOutlet, ListarprogresomusicarelajacionComponent],
  templateUrl: './progresomusicarelajacion.component.html',
  styleUrl: './progresomusicarelajacion.component.css'
})
export class ProgresomusicarelajacionComponent {
  constructor(public route:ActivatedRoute){}

}
