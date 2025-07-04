import { Component } from '@angular/core';
import { ListartarjetaComponent } from "./listartarjeta/listartarjeta.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tarjeta',
  imports: [RouterOutlet,ListartarjetaComponent],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css'
})
export class TarjetaComponent {
  constructor(public route:ActivatedRoute){}
}
