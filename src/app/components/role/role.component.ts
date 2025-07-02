import { Component } from '@angular/core';
import { ListarroleComponent } from "./listarrole/listarrole.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-role',
  imports: [RouterOutlet, ListarroleComponent],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
  constructor(public route:ActivatedRoute){}
}
