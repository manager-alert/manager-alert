import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SelectPlayerPageComponent } from './select-player-page.component';

const routes: Routes = [
  { path: '', component: SelectPlayerPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectPlayerPageRoutingModule { }
