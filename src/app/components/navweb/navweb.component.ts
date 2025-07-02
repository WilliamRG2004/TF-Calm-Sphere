import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navweb',
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule,
    RouterLink
  ],
  templateUrl: './navweb.component.html',
  styleUrl: './navweb.component.css'
})
export class NavwebComponent {

}
