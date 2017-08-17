import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutModule } from '../layout/layout.module';
import { NotFoundPageRoutingModule } from './not-found-page-routing.module';
import { NotFoundPageComponent } from './not-found-page.component';

@NgModule({
  imports: [
    CommonModule,
    NotFoundPageRoutingModule,
    LayoutModule
  ],
  declarations: [
    NotFoundPageComponent
  ]
})
export class NotFoundPageModule { }
