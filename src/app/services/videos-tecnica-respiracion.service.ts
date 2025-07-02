import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { VideosTecnicasRespiracion } from '../models/videosTecnicaRespiracion';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class VideosTecnicaRespiracionService {
  private url=`${base_url}/VideosTecRespiracion`
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<VideosTecnicasRespiracion[]>(this.url)
  }
}
