import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MusicaCategoria } from '../models/musicaCategoria';
import { Subject } from 'rxjs';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})

export class MusicaCategoriaService {
  private url=`${base_url}/musicacategoria`
  private listacambio=new Subject<MusicaCategoria[]>
  
  constructor(private hmuc:HttpClient) { }
  list(){
    return  this.hmuc.get<MusicaCategoria[]>(this.url + '/lista')
  }
  insert(muc:MusicaCategoria){
    return this.hmuc.post(this.url + '/insertar',muc)
  }
  setList(listaNueva:MusicaCategoria[]){
    this.listacambio.next(listaNueva)
  }
  getList(){
    return this.listacambio.asObservable()
  }
  listid(id:number){
    return this.hmuc.get<MusicaCategoria>(`${this.url + '/buscaid'}/${id}`) //son las comillas para la derecha alt+ 9 y 6
  }
  update(muc:MusicaCategoria){
    return this.hmuc.put(this.url + '/edit',muc)
  }
  deleteMuc(id:number){
    return this.hmuc.delete(`${this.url + '/eliminar'}/${id}`) 
  }
}
