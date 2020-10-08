import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalRoutingModule } from './goal-routing.module';
import { GoalsHomeComponent } from './pages/goals-home/goals-home.component';

@NgModule({
  declarations: [GoalsHomeComponent],
  imports: [CommonModule, GoalRoutingModule],
})
export class GoalModule {}
