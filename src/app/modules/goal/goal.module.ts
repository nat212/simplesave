import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { GoalCardComponent } from './components/goal-card/goal-card.component';
import { TransactDialogComponent } from './dialogs/transact-dialog/transact-dialog.component';
import { GoalRoutingModule } from './goal-routing.module';
import { EditGoalComponent } from './pages/edit-goal/edit-goal.component';
import { GoalsHomeComponent } from './pages/goals-home/goals-home.component';

@NgModule({
  declarations: [GoalsHomeComponent, EditGoalComponent, GoalCardComponent, TransactDialogComponent],
  imports: [
    CommonModule,
    GoalRoutingModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSelectModule,
  ],
  entryComponents: [TransactDialogComponent],
})
export class GoalModule {}
