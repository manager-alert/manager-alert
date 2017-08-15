import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: './landing-page/landing-page.module#LandingPageModule'
    }, {
        path: 'not-found',
        loadChildren: './not-found-page/not-found-page.module#NotFoundPageModule'
    },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
