import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotFoundPageRoutingModule } from './not-found-page-routing.module';
import { NotFoundPageComponent } from './not-found-page.component';

@NgModule({
  imports: [
    CommonModule,
    NotFoundPageRoutingModule
  ],
  declarations: [
    NotFoundPageComponent
  ]
})
export class NotFoundPageModule { }
