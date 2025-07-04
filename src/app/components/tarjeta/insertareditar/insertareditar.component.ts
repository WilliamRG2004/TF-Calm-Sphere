import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Tarjeta } from '../../../models/tarjeta';
import { Pago } from '../../../models/pagos';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TarjetaService } from '../../../services/tarjeta.service';
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
  ],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css'
})
export class InsertareditarComponentTarjeta implements OnInit{
  form: FormGroup = new FormGroup({});
  tarjeta: Tarjeta = new Tarjeta();
  id: number = 0;
  edicion: boolean = false;
  listaPago: Pago[] = [];

  constructor(
    private tS: TarjetaService,
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
      nombre: ['', Validators.required],
      numero: ['', Validators.required],
      cvv: ['', Validators.required],
      fecha: ['', Validators.required],
      pag: ['', Validators.required],
    });

    this.pS.list().subscribe((data) => {
      this.listaPago = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.tarjeta.idTarjeta = this.form.value.codigo;
      this.tarjeta.nombreTitularTarjeta = this.form.value.nombre;
      this.tarjeta.numeroTarjeta = this.form.value.numero;
      this.tarjeta.cvvTarjeta = this.form.value.cvv;
      this.tarjeta.fechacaducidadTarjeta = this.form.value.fecha;

      this.tarjeta.pagos = new Pago();
      this.tarjeta.pagos.idPagos = this.form.value.pag;

      if (this.edicion) {
        this.tS.update(this.tarjeta).subscribe(() => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
          this.snackBar.open(
            '✅ Registro de tarjeta actualizado exitosamente',
            'Cerrar',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: 'success-snackbar',
            }
          );
          this.router.navigate(['tarjetas']);
        });
      } else {
        this.tS.insert(this.tarjeta).subscribe(() => {
          this.tS.list().subscribe((data) => {
            this.tS.setList(data);
          });
          this.snackBar.open(
            '✅ Registro de tarjeta guardado exitosamente',
            'Cerrar',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: 'success-snackbar',
            }
          );
          this.router.navigate(['tarjetas']);
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
      this.tS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idTarjeta),
          nombre: new FormControl(
            data.nombreTitularTarjeta,
            Validators.required
          ),
          numero: new FormControl(
            data.numeroTarjeta,
            Validators.required
          ),
          cvv: new FormControl(
            data.cvvTarjeta,
            Validators.required
          ),
          fecha: new FormControl(
            data.fechacaducidadTarjeta,
            Validators.required
          ),
          pag: new FormControl(data.pagos.idPagos, Validators.required),
        });
      });
    }
  }

  cancelar() {
    this.router.navigate(['tarjetas']);
  }
}
