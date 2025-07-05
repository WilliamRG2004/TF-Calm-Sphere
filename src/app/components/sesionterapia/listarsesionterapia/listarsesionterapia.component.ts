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
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7','c8'];
  dataSource:MatTableDataSource<SesionTerapia>=new MatTableDataSource()
  constructor(private seteraserv:SesionTerapiaService){}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dialog = inject(MatDialog)

  ngOnInit(): void {
      this.seteraserv.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })

      this.seteraserv.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }

  openDialog(id:number){
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.eliminar(id);
      }else{
        console.log("Diálogo respondió no eliminar");
      }
    });
  }

  eliminar(id:number){
    this.seteraserv.deleteST(id).subscribe(data=>{
      this.seteraserv.list().subscribe(data=>{
        this.seteraserv.setList(data)
      })
    })
  }
}
