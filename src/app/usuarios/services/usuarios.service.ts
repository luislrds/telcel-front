import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get<any[]>(`${URL}/usuarios/`);
  }

  get(id){
    return this.http.get<any>(`${URL}/usuarios/${id}`);
  }

  post(request){
    return this.http.post(`${URL}/usuarios/`, request);
  }
  
}
