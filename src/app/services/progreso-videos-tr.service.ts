import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ProgresoVideosTRService {
  private url=`${base_url}/ProgresovideosTR`
  constructor(private http:HttpClient) { }
  list(){
    return  this.http.get<ProgresoVideosTRService[]>(this.url)
  }
}
