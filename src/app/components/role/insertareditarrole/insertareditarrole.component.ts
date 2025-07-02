import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Users } from '../../../models/users';
import { UsersService } from '../../../services/users.service';
import {MatSelectModule} from '@angular/material/select';
import { Role } from '../../../models/role';
import { RoleService } from '../../../services/role.service';
import { Usernopass } from '../../../models/usernopass';

@Component({
  selector: 'app-insertareditarrole',
  imports: [
    MatInputModule,
    CommonModule, 
    MatFormFieldModule,  
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './insertareditarrole.component.html',
  styleUrl: './insertareditarrole.component.css'
})
export class InsertareditarroleComponent implements OnInit{
  form:FormGroup=new FormGroup({})
  role:Role=new Role()
  listaUsuarios:Usernopass[]=[]

  id:number=0
  edicion:boolean=false


  constructor(
    private formBuilder:FormBuilder,
    private roleserv:RoleService,
    private router:Router,
    private route:ActivatedRoute,
    private usS:UsersService,

  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id']
      this.edicion=data['id']!=null
      this.init()

    })
      this.form=this.formBuilder.group({
        codigo:[''],
        namerole:['', Validators.required],
        us:['', Validators.required],
    })

        this.usS.list().subscribe(data=>{
      this.listaUsuarios=data
    })

  }

  aceptar(){
    if(this.form.valid){
      this.role.id=this.form.value.codigo
      this.role.rol=this.form.value.namerole
      this.role.user = new Users();
      this.role.user.id=this.form.value.us


      if(this.edicion){
        this.roleserv.update(this.role).subscribe(()=>{
          this.roleserv.list().subscribe(data=>{
            this.roleserv.setList(data)
          })
        })
      }else{
        this.roleserv.insert(this.role).subscribe(()=>{
          this.roleserv.list().subscribe(data=>{
            this.roleserv.setList(data)
          })
        })
      }
    }
    this.router.navigate(['role'])
  }

  init(){
    if(this.edicion){
      this.roleserv.listid(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.id),
          namerole:new FormControl(data.rol),
          us:new FormControl(data.user.id)
        })
      })
    }
  }
}
