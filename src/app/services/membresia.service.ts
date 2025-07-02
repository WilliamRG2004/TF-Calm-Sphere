import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Membresia } from '../models/membresia';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class MembresiaService {
  private url=`${base_url}/membresia`
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Membresia[]>(this.url)
  }
}
