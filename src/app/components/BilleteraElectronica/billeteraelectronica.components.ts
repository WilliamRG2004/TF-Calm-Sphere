import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarbilleteraelectronicaComponent } from "./listarbilleteraelectronica/listarbilleteraelectronica.component";

@Component({
  selector: 'app-billetera-electronica',
  imports: [RouterOutlet, ListarbilleteraelectronicaComponent],
  templateUrl: './billetera-electronica.component.html',
  styleUrl: './billetera-electronica.component.css'
})
export class BilleteraElectronicaComponent {
  constructor(public route:ActivatedRoute){}
}
