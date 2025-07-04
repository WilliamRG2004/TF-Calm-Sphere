import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Membresia } from '../../../models/membresia';
import { MembresiaService } from '../../../services/membresia.service';

@Component({
  selector: 'app-listarmembresia',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    RouterLink
  ],
  templateUrl: './listarmembresia.component.html',
  styleUrl: './listarmembresia.component.css'
})
export class ListarmembresiaComponent implements OnInit{
  displayedColumns: string[] = ['ID', 'Fecha Inicio', 'Fecha Fin', 'Estado', 'Usuario' ,'Actualizar','Eliminar'];
  dataSource: MatTableDataSource<Membresia> = new MatTableDataSource();

  private paginator!: MatPaginator;

  constructor(private mS: MembresiaService) {}

  @ViewChild(MatPaginator)
  set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  ngOnInit(): void {
      this.mS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
        this.setDataSourceAttributes();
      })

      this.mS.getList().subscribe(data=>{
        this.dataSource = new MatTableDataSource(data)
        this.setDataSourceAttributes();
      })
  }

  eliminar(id: number): void {
    this.mS.delete(id).subscribe(() => {
      this.mS.list().subscribe((data) => {
        this.mS.setList(data);
        this.dataSource = new MatTableDataSource(data);
        this.setDataSourceAttributes();
      });
    });
  }

  private setDataSourceAttributes(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
