import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { SesionTerapiaService } from '../../../services/sesion-terapia.service';
import { TerapiamoresesionHU } from '../../../models/terapiamoresesionHU';

@Component({
  selector: 'app-listarterapiamoresesion',
  imports: [
    MatTableModule,
    MatPaginator, 
    MatSort
  ],
  templateUrl: './listarterapiamoresesion.component.html',
  styleUrl: './listarterapiamoresesion.component.css'
})
export class ListarterapiamoresesionComponent implements OnInit{
  displayedColumns:string[]=['c1','c2','c3'];
  dataSource:MatTableDataSource<TerapiamoresesionHU>=new MatTableDataSource()
  constructor(private seteraserv:SesionTerapiaService){}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
      this.seteraserv.listTerapiamoresesion().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }
}
