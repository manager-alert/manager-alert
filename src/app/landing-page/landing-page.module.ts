import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutModule } from '../layout/layout.module';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    LayoutModule
  ],
  declarations: [
    LandingPageComponent
  ]
})
export class LandingPageModule { }
