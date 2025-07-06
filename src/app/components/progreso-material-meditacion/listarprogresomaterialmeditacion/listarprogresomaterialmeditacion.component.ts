import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { progresoMaterialMeditacion } from '../../../models/progresoMaterialMeditacion';
import { ProgresoMaterialMeditacionService } from '../../../services/progreso-material-meditacion.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarprogresomaterialmeditacion',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    RouterLink,
    CommonModule,
    FormsModule
  ],
  templateUrl: './listarprogresomaterialmeditacion.component.html',
  styleUrl: './listarprogresomaterialmeditacion.component.css'
})
export class ListarprogresomaterialmeditacionComponent implements OnInit{
  displayedColumns: string[] = [];
  role: string = '';
  dataSource: MatTableDataSource<progresoMaterialMeditacion> = new MatTableDataSource();

  private paginator!: MatPaginator;

  constructor(private pmmS: ProgresoMaterialMeditacionService, private loginService: LoginService) {}

  @ViewChild(MatPaginator)
  set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  ngOnInit(): void {

    this.role = this.loginService.showRole();

    this.displayedColumns = ['ID', 'Fecha Completado', 'Completado', 'Sesión Terapia', 'Material Meditación'];
    if (this.role !== 'JOVENESPROFESIONALES') {
      this.displayedColumns.push('Actualizar','Eliminar');
    }

      this.pmmS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
        this.setDataSourceAttributes();
      })

      this.pmmS.getList().subscribe(data=>{
        this.dataSource = new MatTableDataSource(data)
        this.setDataSourceAttributes();
      })
  }

  eliminar(id: number): void {
    this.pmmS.delete(id).subscribe(() => {
      this.pmmS.list().subscribe((data) => {
        this.pmmS.setList(data);
        this.dataSource = new MatTableDataSource(data);
        this.setDataSourceAttributes();
      });
    });
  }


