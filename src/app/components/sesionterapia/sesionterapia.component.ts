import { Component } from '@angular/core';
import { ListarsesionterapiaComponent } from "./listarsesionterapia/listarsesionterapia.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sesionterapia',
  imports: [RouterOutlet, ListarsesionterapiaComponent],
  templateUrl: './sesionterapia.component.html',
  styleUrl: './sesionterapia.component.css'
})
export class SesionterapiaComponent {
  constructor(public route:ActivatedRoute){}
}
