import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuariosSubject: BehaviorSubject<any[]> = new BehaviorSubject([]); 
  usuarios$ = this.usuariosSubject.asObservable();
  loading = false;
  constructor(
    private _usuariosService: UsuariosService) { 
      this.getAll();
    }

  ngOnInit(): void {
  }

  getAll(){
    this._usuariosService.getAll().subscribe(u=>{
      this.usuariosSubject.next(u)
    })    
  }

}
