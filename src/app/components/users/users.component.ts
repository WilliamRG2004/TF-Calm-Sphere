import { Component } from '@angular/core';
import { ListausersComponent } from "./listausers/listausers.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [RouterOutlet, ListausersComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(public route:ActivatedRoute){}

}
