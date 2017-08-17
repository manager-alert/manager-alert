import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MdButtonModule, MdIconModule, MdToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarService } from './toolbar/toolbar.service';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    RouterModule
  ],
  declarations: [
    ToolbarComponent
  ], exports: [
    ToolbarComponent
  ]
})
export class LayoutModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LayoutModule,
      providers: [
        ToolbarService
      ]
    };
  }
}
