import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { SesionTerapiaService } from '../../../services/sesion-terapia.service';
import { UsermoresesionHU } from '../../../models/usermoresesionHU';

@Component({
  selector: 'app-listarusuariomoresesion',
  imports: [
    MatTableModule,
    MatPaginator, 
    MatSort
  ],
  templateUrl: './listarusuariomoresesion.component.html',
  styleUrl: './listarusuariomoresesion.component.css'
})
export class ListarusuariomoresesionComponent implements OnInit{
  displayedColumns:string[]=['c1','c2','c3'];
  dataSource:MatTableDataSource<UsermoresesionHU>=new MatTableDataSource()
  constructor(private seteraserv:SesionTerapiaService){}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
      this.seteraserv.listUsermoresesion().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }
}
