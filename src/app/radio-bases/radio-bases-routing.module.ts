import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RadioBasesComponent } from './radio-bases.component';

const routes: Routes = [{ path: '', component: RadioBasesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadioBasesRoutingModule { }
