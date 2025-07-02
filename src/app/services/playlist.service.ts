import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Playlist } from '../models/playlist';
import { Subject } from 'rxjs';
const base_url=environment.base

@Injectable({
  providedIn: 'root'
})

export class PlaylistService {
  private url=`${base_url}/playlist`
  private listacambio=new Subject<Playlist[]>


  constructor(private hplay:HttpClient) { }
  
  list(){
    return this.hplay.get<Playlist[]>(this.url + '/lista')
  }
  insert(play:Playlist){
    return this.hplay.post(this.url + '/insertar',play)
  }
  setList(listaNueva:Playlist[]){
    this.listacambio.next(listaNueva)
  }
  getList(){
    return this.listacambio.asObservable()
  }
  listid(id:number){
    return this.hplay.get<Playlist>(`${this.url + '/buscaid'}/${id}`) //son las comillas para la derecha alt+ 9 y 6
  }
  update(play:Playlist){
    return this.hplay.put(this.url + '/edit',play)
  }
  deletePlay(id:number){
    return this.hplay.delete(`${this.url + '/eliminar'}/${id}`) 
  }
}
