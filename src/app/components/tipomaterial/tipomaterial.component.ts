import { Component } from '@angular/core';
import { ListartipomaterialComponent } from "./listartipomaterial/listartipomaterial.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tipomaterial',
  imports: [RouterOutlet, ListartipomaterialComponent],
  templateUrl: './tipomaterial.component.html',
  styleUrl: './tipomaterial.component.css'
})
export class TipomaterialComponent {
  constructor(public route:ActivatedRoute){}
}
