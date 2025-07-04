import { Component } from '@angular/core';
import { ListarmembresiaComponent } from "./listarmembresia/listarmembresia.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-membresia',
  imports: [RouterOutlet, ListarmembresiaComponent],
  templateUrl: './membresia.component.html',
  styleUrl: './membresia.component.css'
})
export class MembresiaComponent {
  constructor(public route:ActivatedRoute){}
}
