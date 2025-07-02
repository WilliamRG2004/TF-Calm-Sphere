import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role';
import { Subject } from 'rxjs';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})

export class RoleService {
  private url=`${base_url}/rol`
  private listacambio=new Subject<Role[]>
  
  constructor(private hrole:HttpClient) { }
 list(){
     return this.hrole.get<Role[]>(this.url + '/lista')
  }
  insert(r:Role){
   return this.hrole.post(this.url + '/insertar',r)
  }
   setList(listaNueva:Role[]){
     this.listacambio.next(listaNueva)
   }
   getList(){
     return this.listacambio.asObservable()
   }
   listid(id:number){
     return this.hrole.get<Role>(`${this.url + '/buscaid'}/${id}`) //son las comillas para la derecha alt+ 9 y 6
   }
   update(ro:Role){
     return this.hrole.put(this.url + '/edit',ro)
   }
   deleteR(id:number){
     return this.hrole.delete(`${this.url + '/eliminar'}/${id}`) 
   }
}
