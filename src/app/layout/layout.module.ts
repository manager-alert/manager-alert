import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdIconModule, MdSidenavModule, MdToolbarModule } from '@angular/material';

import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdIconModule,
    MdSidenavModule,
    MdToolbarModule,
  ],
  declarations: [
    SidenavComponent,
    ToolbarComponent
  ], exports: [
    SidenavComponent,
    ToolbarComponent
  ]
})
export class LayoutModule { }
