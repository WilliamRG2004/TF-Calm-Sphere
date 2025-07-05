import { Component, OnInit, inject, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialog} from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { SesionTerapia } from '../../../models/sesionTerapia';
import { SesionTerapiaService } from '../../../services/sesion-terapia.service';

@Component({
  selector: 'app-listarsesionterapia',
  imports: [
    MatTableModule,
    MatPaginator, 
    MatButtonModule, 
    RouterLink, 
    MatSort
  ],
  templateUrl: './listarsesionterapia.component.html',
  styleUrl: './listarsesionterapia.component.css'
})
export class ListarsesionterapiaComponent implements OnInit{
  
}
