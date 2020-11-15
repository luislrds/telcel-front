import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { RadioBasesRoutingModule } from './radio-bases-routing.module';
import { RadioBasesComponent } from './radio-bases.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [RadioBasesComponent],
  imports: [
    CommonModule,
    RadioBasesRoutingModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ]
})
export class RadioBasesModule { }
