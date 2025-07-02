import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TipoMaterial } from '../models/tipoMaterial';
import { Subject } from 'rxjs';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class TipoMaterialService {
  private url=`${base_url}/tipomaterial`
  private listacambio=new Subject<TipoMaterial[]>
  
  constructor(private htipom:HttpClient) { }

  list(){
    return this.htipom.get<TipoMaterial[]>(this.url + '/lista')
  }
  insert(tipo:TipoMaterial){
    return this.htipom.post(this.url + '/insertar',tipo)
  }
  setList(listaNueva:TipoMaterial[]){
    this.listacambio.next(listaNueva)
  }
  getList(){
    return this.listacambio.asObservable()
  }
  listid(id:number){
    return this.htipom.get<TipoMaterial>(`${this.url + '/buscaid'}/${id}`) //son las comillas para la derecha alt+ 9 y 6
  }
  update(tipo:TipoMaterial){
    return this.htipom.put(this.url + '/edit',tipo)
  }
  deleteTipom(id:number){
    return this.htipom.delete(`${this.url + '/eliminar'}/${id}`) 
  }
}
