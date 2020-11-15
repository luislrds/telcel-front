import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule} from '@angular/forms';
import { UsuariosFormRoutingModule } from './usuarios-form-routing.module';
import { UsuariosFormComponent } from './usuarios-form.component';


@NgModule({
  declarations: [UsuariosFormComponent],
  imports: [
    CommonModule,
    UsuariosFormRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsuariosFormModule { }
