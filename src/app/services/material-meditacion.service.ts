import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MaterialMeditacion } from '../models/materialMeditacion';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class MaterialMeditacionService {
  private url=`${base_url}/MateMeditacion`
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<MaterialMeditacion[]>(this.url)
  }
}
