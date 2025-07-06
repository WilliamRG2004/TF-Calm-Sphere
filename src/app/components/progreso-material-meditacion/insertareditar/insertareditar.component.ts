import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { progresoMaterialMeditacion } from '../../../models/progresoMaterialMeditacion';
import { SesionTerapia } from '../../../models/sesionTerapia';
import { MaterialMeditacion } from '../../../models/materialMeditacion';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProgresoMaterialMeditacionService } from '../../../services/progreso-material-meditacion.service';
import { SesionTerapiaService } from '../../../services/sesion-terapia.service';
import { MaterialMeditacionService } from '../../../services/material-meditacion.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-insertareditar',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, CommonModule, MatSelectModule, MatSnackBarModule, MatRadioModule, MatDatepickerModule],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css'
})
export class InsertareditarComponentProgresoMaterialMeditacion implements OnInit{
  form: FormGroup = new FormGroup({})
  progresoMaterialMeditacion:progresoMaterialMeditacion = new progresoMaterialMeditacion()
  id:number=0
  edicion:boolean = false
  listaSesionTerapia:SesionTerapia[] = []
  listaMaterialMeditacion:MaterialMeditacion[] = []
  fechaMaxima: Date = new Date();
  matcher = new MyErrorStateMatcher();

  constructor(
    private pmmS:ProgresoMaterialMeditacionService,
    private formBuilder:FormBuilder,
    private router:Router,
    private stS: SesionTerapiaService,
    private mmS: MaterialMeditacionService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {  
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      fecha:['', [Validators.required, this.fechaNoFuturaValidator()]],
      finalizado:['', Validators.required],
      ses:['', Validators.required],
      mat:['', Validators.required],
    })

    this.stS.list().subscribe(data=>{
      this.listaSesionTerapia=data
    })
    
    this.mmS.list().subscribe(data=>{
      this.listaMaterialMeditacion=data
    })  
  }

  aceptar(){
    if(this.form.valid){
      this.progresoMaterialMeditacion.idProgresoMaterialMedi = this.form.value.codigo
      this.progresoMaterialMeditacion.fechacompletado = this.form.value.fecha
      this.progresoMaterialMeditacion.completado = this.form.value.finalizado
      
      this.progresoMaterialMeditacion.sesionTerapia = new SesionTerapia();
      this.progresoMaterialMeditacion.sesionTerapia.idSesion = this.form.value.ses;

      this.progresoMaterialMeditacion.materialMeditacion = new MaterialMeditacion();
      this.progresoMaterialMeditacion.materialMeditacion.idMaterialMeditacion = this.form.value.mat;

      if (this.edicion) {
        this.pmmS.update(this.progresoMaterialMeditacion).subscribe(() => {
          this.pmmS.list().subscribe((data) => {
            this.pmmS.setList(data);
          });
          this.snackBar.open('✅ Registro de progreso material meditación actualizado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'success-snackbar',
          });
          this.router.navigate(['progresosmaterialesmeitaciones']);
        });
      } else {
        this.pmmS.insert(this.progresoMaterialMeditacion).subscribe(() => {
          this.pmmS.list().subscribe((data) => {
            this.pmmS.setList(data);
          });
          this.snackBar.open('✅ Registro de progreso material meditación guardado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'success-snackbar',
          });
          this.router.navigate(['progresosmaterialesmeitaciones']);
        });
      }
    } else {
      this.snackBar.open('❌ Por favor completa todos los campos obligatorios', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: 'error-snackbar',
      });
    }
  }

  init(){
    if(this.edicion){
      this.pmmS.listId(this.id).subscribe(data=>{
        this.form = new FormGroup({
          codigo:new FormControl(data.idProgresoMaterialMedi),
          fecha: new FormControl(data.fechacompletado, Validators.required),
          finalizado: new FormControl(data.completado, Validators.required),
          ses: new FormControl(data.sesionTerapia.idSesion, Validators.required),
          mat: new FormControl(data.materialMeditacion.idMaterialMeditacion, Validators.required),
        })
      })
    } 
  }

  cancelar() {
    this.router.navigate(['progresosmaterialesmeitaciones']);
  }

  fechaNoFuturaValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const fechaIngresada = new Date(control.value);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      return fechaIngresada < hoy ? null : { fechaInvalida: true };
    };
  }
}
