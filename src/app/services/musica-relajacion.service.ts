import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MusicaRelajacion } from '../models/musicaRelajacion';
import { Subject } from 'rxjs';
import { CategoriamasusadaDTO } from '../models/categoriamasusadaDTO';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class MusicaRelajacionService {
  private url=`${base_url}/musicarelax`
  private listacambio=new Subject<MusicaRelajacion[]>
  
  constructor(private hmurelax:HttpClient) { }
  list(){
    return  this.hmurelax.get<MusicaRelajacion[]>(this.url + '/lista')
  }
  insert(murelax:MusicaRelajacion){
    return this.hmurelax.post(this.url + '/insertar',murelax)
  }
  setList(listaNueva:MusicaRelajacion[]){
    this.listacambio.next(listaNueva)
  }
  getList(){
    return this.listacambio.asObservable()
  }
  listid(id:number){
    return this.hmurelax.get<MusicaRelajacion>(`${this.url + '/buscaid'}/${id}`) //son las comillas para la derecha alt+ 9 y 6
  }
  update(mucrelax:MusicaRelajacion){
    return this.hmurelax.put(this.url + '/edit',mucrelax)
  }
  deleteMucrelax(id:number){
    return this.hmurelax.delete(`${this.url + '/eliminar'}/${id}`) 
  }
  listmuscatetop(){
    return this.hmurelax.get<CategoriamasusadaDTO[]>(this.url + '/top-categorias')
  }
}
