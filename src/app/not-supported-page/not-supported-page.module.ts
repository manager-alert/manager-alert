import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotSupportedPageRoutingModule } from './not-supported-page-routing.module';
import { NotSupportedPageComponent } from './not-supported-page.component';

@NgModule({
  imports: [
    CommonModule,
    NotSupportedPageRoutingModule
  ],
  declarations: [NotSupportedPageComponent]
})
export class NotSupportedPageModule { }
