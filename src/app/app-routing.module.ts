import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/goals',
    pathMatch: 'full',
  },
  {
    path: 'session',
    loadChildren: () => import('./modules/session/session.module').then((m) => m.SessionModule),
  },
  {
    path: 'goals',
    loadChildren: () => import('./modules/goal/goal.module').then((m) => m.GoalModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
