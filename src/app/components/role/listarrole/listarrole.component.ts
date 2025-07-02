import { Component, OnInit, inject, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialog} from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-listarrole',
  imports: [
    MatTableModule,
    MatPaginator, 
    MatButtonModule, 
    RouterLink, 
    MatSort
  ],
  templateUrl: './listarrole.component.html',
  styleUrl: './listarrole.component.css'
})
export class ListarroleComponent implements OnInit{
  displayedColumns:String[]=['c1','c2','c3','c4','c5'];
  dataSource:MatTableDataSource<Role>=new MatTableDataSource()
  constructor(private roleserv:RoleService){}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dialog = inject(MatDialog)

  ngOnInit(): void {
      this.roleserv.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })

      this.roleserv.getList().subscribe(data=>{
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
    this.roleserv.deleteR(id).subscribe(data=>{
      this.roleserv.list().subscribe(data=>{
        this.roleserv.setList(data)
      })
    })
  }
}
