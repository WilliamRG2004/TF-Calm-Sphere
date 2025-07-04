import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BilleteraElectronica } from '../../../models/billeteraElectronica';
import { Pago } from '../../../models/pagos';
import { BilleteraElectronicaService } from '../../../services/billetera-electronica.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PagoService } from '../../../services/pago.service';

@Component({
  selector: 'app-insertareditar',
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule
  ],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css'
})
export class InsertareditarComponentBilleteraElectronica implements OnInit{
  form: FormGroup = new FormGroup({});
  billeteraElectronica: BilleteraElectronica = new BilleteraElectronica();
  id: number = 0;
  edicion: boolean = false;
  listaPagos: Pago[] = [];

  constructor(
    private beS: BilleteraElectronicaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private pS: PagoService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      compania: ['', Validators.required],
      imagenQR: ['', Validators.required],
      evidencia: ['', Validators.required],
      pag: ['', Validators.required],
    });

    this.pS.list().subscribe((data) => {
      this.listaPagos = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.billeteraElectronica.idBilleteraElectronica = this.form.value.codigo;
      this.billeteraElectronica.companiaBilleteraElectronica = this.form.value.compania;
      this.billeteraElectronica.imagenQRBilleteraElectronica = this.form.value.imagenQR;
      this.billeteraElectronica.evidenciaBilleteraElectronica = this.form.value.evidencia;

      this.billeteraElectronica.pagos = new Pago();
      this.billeteraElectronica.pagos.idPagos = this.form.value.pag;

      if (this.edicion) {
        this.beS.update(this.billeteraElectronica).subscribe(() => {
          this.beS.list().subscribe((data) => {
            this.beS.setList(data);
          });
          this.snackBar.open(
            '✅ Registro de billetera electrónica actualizado exitosamente',
            'Cerrar',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: 'success-snackbar',
            }
          );
          this.router.navigate(['billeteraselectronicas']);
        });
      } else {
        this.beS.insert(this.billeteraElectronica).subscribe(() => {
          this.beS.list().subscribe((data) => {
            this.beS.setList(data);
          });
          this.snackBar.open(
            '✅ Registro de billetera electrónica guardado exitosamente',
            'Cerrar',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: 'success-snackbar',
            }
          );
          this.router.navigate(['billeteraselectronicas']);
        });
      }
    } else {
      this.snackBar.open(
        '❌ Por favor completa todos los campos obligatorios',
        'Cerrar',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'error-snackbar',
        }
      );
    }
  }

  init() {
    if (this.edicion) {
      this.beS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idBilleteraElectronica),
          compania: new FormControl(
            data.companiaBilleteraElectronica,
            Validators.required
          ),
          imagenQR: new FormControl(
            data.imagenQRBilleteraElectronica,
            Validators.required
          ),
          evidencia: new FormControl(
            data.evidenciaBilleteraElectronica,
            Validators.required
          ),
          pag: new FormControl(data.pagos.idPagos, Validators.required),
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['billeteraselectronicas']);
  }
}
