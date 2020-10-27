import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fabShowHide } from '@animations/fab-show-hide.animation';
import { TransactDialogComponent } from '@modules/goal/dialogs/transact-dialog/transact-dialog.component';
import { Goal } from '@modules/goal/state/goal.model';
import { GoalQuery } from '@modules/goal/state/goal.query';
import { GoalService } from '@modules/goal/state/goal.service';
import Fuse from 'fuse.js';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'ss-goals-home',
  templateUrl: './goals-home.component.html',
  styleUrls: ['./goals-home.component.scss'],
  animations: [fabShowHide],
})
export class GoalsHomeComponent implements OnInit {
  public goals$: Observable<Goal[]>;
  public filteredGoals$: Observable<Goal[]>;
  public filterForm: FormGroup;
  constructor(
    private goalQuery: GoalQuery,
    private alert: AlertService,
    private goalService: GoalService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.goals$ = this.goalQuery.selectAll();
    this.filterForm = this.formBuilder.group({
      search: [''],
      status: ['both'],
    });
    const searchSource$ = this.filterForm
      .get('search')
      .valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(500),
        startWith(this.filterForm.value.search),
      );
    const statusSource$ = this.filterForm
      .get('status')
      .valueChanges.pipe(startWith(this.filterForm.value.status), distinctUntilChanged());
    const goalFuse$ = this.goals$.pipe(
      map((goals) => {
        const opts: Fuse.IFuseOptions<Goal> = { keys: ['name'] };
        const index = Fuse.createIndex(opts.keys, goals);
        return new Fuse(goals, opts, index);
      }),
    );
    const filterStatus = (goal: Goal, status: 'both' | 'achieved' | 'unachieved') =>
      status === 'both' || (status === 'achieved') === goal.achieved;
    this.filteredGoals$ = combineLatest([
      this.goals$,
      goalFuse$,
      searchSource$,
      statusSource$,
    ]).pipe(
      map(([goals, goalFuse, searchTerm, status]) =>
        (searchTerm ? goalFuse.search(searchTerm).map((i) => i.item) : goals).filter((g) =>
          filterStatus(g, status),
        ),
      ),
    );
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

  public markAchieved(goal: Goal): void {
    this.goalService.updateGoal(goal.id, { achieved: !goal.achieved }).subscribe();
  }
}
