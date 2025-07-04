import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { BilleteraElectronica } from '../../../models/billeteraElectronica';
import { BilleteraElectronicaService } from '../../../services/billetera-electronica.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarbilleteraelectronica',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
    CommonModule
  ],
  templateUrl: './listarbilleteraelectronica.component.html',
  styleUrl: './listarbilleteraelectronica.component.css'
})
export class ListarbilleteraelectronicaComponent implements OnInit{
  displayedColumns: string[] = [];
  role: string = '';
  dataSource: MatTableDataSource<BilleteraElectronica> = new MatTableDataSource();

  private paginator!: MatPaginator;

  constructor(private beS: BilleteraElectronicaService, private loginService: LoginService) {}

  @ViewChild(MatPaginator)
  set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  ngOnInit(): void {
    this.role = this.loginService.showRole();

    this.displayedColumns = ['ID', 'Compañia', 'Imagen QR', 'Evidencia', 'Pago'];
    if (this.role !== 'JOVENESPROFESIONALES') {
      this.displayedColumns.push('Pago','Actualizar', 'Eliminar');
    }

    this.beS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.setDataSourceAttributes();
    });

    this.beS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.setDataSourceAttributes();
    });
  }

  eliminar(id: number): void {
    this.beS.delete(id).subscribe(() => {
      this.beS.list().subscribe((data) => {
        this.beS.setList(data);
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

  esJoven(): boolean {
    return this.role === 'JOVENESPROFESIONALES';
  }
}
