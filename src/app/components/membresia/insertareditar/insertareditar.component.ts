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
import { Membresia } from '../../../models/membresia';
import { Usuario } from '../../../models/usuario';
import { MembresiaService } from '../../../services/membresia.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

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
export class InsertareditarComponentMembresia implements OnInit{
  form: FormGroup = new FormGroup({})
  membresia:Membresia = new Membresia()
  id:number=0
  edicion:boolean = false
  listaUsuarios:Usuario[] = []
  fechaMaxima: Date = new Date();
  matcher = new MyErrorStateMatcher();

  constructor(
    private mS:MembresiaService,
    private formBuilder:FormBuilder,
    private router:Router,
    private uS: UsuarioService,
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
      inicio:['', [Validators.required, this.fechaNoFuturaValidator()]],
      fin:['', [Validators.required, this.fechaNoFuturaValidator()]],
      estado:['', Validators.required],
      usu:['', Validators.required],
    })

    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })
    
    this.uS.list().subscribe(data=>{
      this.listaUsuarios=data
    })  
  }

  aceptar(){
    if(this.form.valid){
      this.membresia.idMembresia = this.form.value.codigo
      this.membresia.fechainicioMembresia = this.form.value.inicio
      this.membresia.fechafinalMembresia = this.form.value.fin
      this.membresia.estadoMembresia = this.form.value.estado

      this.membresia.usuario = new Usuario();
      this.membresia.usuario.id = this.form.value.usu;

      if (this.edicion) {
        this.mS.update(this.membresia).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
          this.snackBar.open('✅ Registro de membresías actualizado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'success-snackbar',
          });
          this.router.navigate(['membresias']);
        });
      } else {
        this.mS.insert(this.membresia).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
          this.snackBar.open('✅ Registro de membresías guardado exitosamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'success-snackbar',
          });
          this.router.navigate(['membresias']);
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
      this.mS.listId(this.id).subscribe(data=>{
        this.form = new FormGroup({
          codigo:new FormControl(data.idMembresia),
          inicio: new FormControl(data.fechainicioMembresia, Validators.required),
          fin: new FormControl(data.fechafinalMembresia, Validators.required),
          estado: new FormControl(data.estadoMembresia, Validators.required),
          usu: new FormControl(data.usuario.id, Validators.required),
        })
      })
    } 
  }

  cancelar() {
    this.router.navigate(['membresias']);
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
