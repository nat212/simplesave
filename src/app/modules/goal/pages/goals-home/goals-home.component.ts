import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fabShowHide } from '@animations/fab-show-hide.animation';
import { TransactDialogComponent } from '@modules/goal/dialogs/transact-dialog/transact-dialog.component';
import { Goal } from '@modules/goal/state/goal.model';
import { GoalQuery } from '@modules/goal/state/goal.query';
import { GoalService } from '@modules/goal/state/goal.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'ss-goals-home',
  templateUrl: './goals-home.component.html',
  styleUrls: ['./goals-home.component.scss'],
  animations: [fabShowHide],
})
export class GoalsHomeComponent implements OnInit {
  public goals$: Observable<Goal[]>;
  constructor(
    private goalQuery: GoalQuery,
    private alert: AlertService,
    private goalService: GoalService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.goals$ = this.goalQuery.selectAll();
  }

  public deleteGoal(goal: Goal): void {
    this.alert
      .confirm('Delete Goal', `Are you sure you wish to delete ${goal.name}?`)
      .pipe(filter((value) => value))
      .subscribe(() => {
        this.goalService.deleteGoal(goal).subscribe();
      });
  }

  public editGoal(goal: Goal): void {
    this.router.navigate([goal.id], { relativeTo: this.route });
  }

  public depositWithdraw(goal: Goal): void {
    this.alert
      .openDialog<{ amount: number; toGoal?: Goal; type: 'deposit' | 'withdraw' | 'transfer' }>(
        TransactDialogComponent,
        { data: { goal } },
      )
      .pipe(filter((val) => !!val))
      .subscribe(({ amount, toGoal, type }) => {
        console.log(toGoal);
        switch (type) {
          case 'transfer':
            this.goalService.transfer(goal.id, toGoal.id, amount).subscribe();
            break;
          case 'withdraw':
            this.goalService.withdraw(goal.id, amount).subscribe();
            break;
          case 'deposit':
            this.goalService.deposit(goal.id, amount).subscribe();
            break;
        }
      });
  }
}
