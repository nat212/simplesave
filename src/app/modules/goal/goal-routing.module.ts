import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Crumb } from '@components/breadcrumbs-bar/breadcrumbs-bar.component';
import { GoalsHomeComponent } from './pages/goals-home/goals-home.component';

const routes: Routes = [
  {
    path: '',
    component: GoalsHomeComponent,
    data: { breadcrumbs: [{ path: null, label: 'Goals' }] as Crumb[] },
  },
  {
    path: ':id',
    component: GoalsHomeComponent,
    data: {
      breadcrumbs: [
        { path: '..', label: 'Goals' },
        { path: null, label: 'Edit' },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalRoutingModule {}
