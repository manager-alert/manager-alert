import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectPlayerPageRoutingModule } from './select-player-page-routing.module';
import { SelectPlayerPageComponent } from './select-player-page.component';

@NgModule({
  imports: [
    CommonModule,
    SelectPlayerPageRoutingModule
  ],
  declarations: [SelectPlayerPageComponent]
})
export class SelectPlayerPageModule { }
