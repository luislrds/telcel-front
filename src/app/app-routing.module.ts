import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    redirectTo : '/usuarios',
    pathMatch : 'full'
  },
  { path: 'radiobases', loadChildren: () => import('./radio-bases/radio-bases.module').then(m => m.RadioBasesModule) },
  { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'usuarios-form', loadChildren: () => import('./usuarios/usuarios-form/usuarios-form.module').then(m => m.UsuariosFormModule) },
  { path: 'usuarios-form/:id', loadChildren: () => import('./usuarios/usuarios-form/usuarios-form.module').then(m => m.UsuariosFormModule) },
  {
    path:'**',
    redirectTo : '/usuarios',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
