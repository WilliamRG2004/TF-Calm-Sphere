import { Component } from '@angular/core';
import { ListarplaylistComponent } from "./listarplaylist/listarplaylist.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-playlist',
  imports: [RouterOutlet, ListarplaylistComponent],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {
  constructor(public route:ActivatedRoute){}
}
