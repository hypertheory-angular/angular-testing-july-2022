import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'unauthorized', component: UnauthorizedComponent },
      {
        path: 'forbidden',
        component: ForbiddenComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [HomeComponent, UnauthorizedComponent, ForbiddenComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeModule {}
