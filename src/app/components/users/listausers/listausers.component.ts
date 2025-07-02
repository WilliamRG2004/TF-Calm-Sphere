import { Component, OnInit, inject, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialog} from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { UsersService } from '../../../services/users.service';
import { Usernopass } from '../../../models/usernopass';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listausers',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginator, 
    MatButtonModule, 
    RouterLink, 
    MatSort
  ],
  templateUrl: './listausers.component.html',
  styleUrl: './listausers.component.css'
})
export class ListausersComponent implements OnInit{
  displayedColumns:string[]=['c1','c2','c3','c4','c5','c6','c7','c8'];
  dataSource:MatTableDataSource<Usernopass>=new MatTableDataSource()
  constructor(private usersserv:UsersService){}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dialog = inject(MatDialog)

  ngOnInit(): void {
      this.usersserv.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })

      this.usersserv.getList().subscribe(data=>{
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
    this.usersserv.deleteUs(id).subscribe(data=>{
      this.usersserv.list().subscribe(data=>{
        this.usersserv.setList(data)
      })
    })
  }
}
