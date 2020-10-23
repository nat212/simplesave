import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Crumb } from '@components/breadcrumbs-bar/breadcrumbs-bar.component';
import { EditGoalComponent } from './pages/edit-goal/edit-goal.component';
import { GoalsHomeComponent } from './pages/goals-home/goals-home.component';
import { GoalGuard } from './state/goal.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [GoalGuard],
    canDeactivate: [GoalGuard],
    children: [
      {
        path: '',
        component: GoalsHomeComponent,
        data: { breadcrumbs: [{ path: null, label: 'Goals' }] as Crumb[] },
      },
      {
        path: ':id',
        component: EditGoalComponent,
        data: {
          breadcrumbs: [
            { path: '..', label: 'Goals' },
            { path: null, label: 'Edit' },
          ],
        },
      },
      {
        path: 'add',
        component: EditGoalComponent,
        data: {
          breadcrumbs: [
            { path: '..', label: 'Goals' },
            { path: null, label: 'Add Goal' },
          ],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalRoutingModule {}
