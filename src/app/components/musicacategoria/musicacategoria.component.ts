import { Component } from '@angular/core';
import { ListarmusicacategoriaComponent } from './listarmusicacategoria/listarmusicacategoria.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-musicacategoria',
  imports: [RouterOutlet, ListarmusicacategoriaComponent],
  templateUrl: './musicacategoria.component.html',
  styleUrl: './musicacategoria.component.css'
})
export class MusicacategoriaComponent {
  constructor(public route:ActivatedRoute){}
}
