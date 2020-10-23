import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fabShowHide } from '@animations/fab-show-hide.animation';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { Goal } from '@modules/goal/state/goal.model';
import { GoalQuery } from '@modules/goal/state/goal.query';
import { GoalService } from '@modules/goal/state/goal.service';
import { Observable, of, Subject } from 'rxjs';
import { filter, switchMap, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ss-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.scss'],
  animations: [fabShowHide],
})
export class EditGoalComponent implements OnInit, OnDestroy {
  public goal$: Observable<Goal>;
  public goalForm: FormGroup;
  private destroyed$ = new Subject<void>();
  private goalId: string;

  constructor(
    private route: ActivatedRoute,
    private goalQuery: GoalQuery,
    private routerQuery: RouterQuery,
    private formBuilder: FormBuilder,
    private goalService: GoalService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.goal$ = this.routerQuery
      .selectParams()
      .pipe(switchMap((params) => (params.id ? this.goalQuery.selectEntity(params.id) : of(null))));
    this.goalForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: [null, Validators.required],
    });
    this.goal$
      .pipe(
        takeUntil(this.destroyed$),
        filter((goal) => !!goal),
      )
      .subscribe((goal) => {
        this.goalId = goal.id;
        const { name, amount } = goal;
        this.goalForm.patchValue({ name, amount });
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
  }

  public submit(): void {
    const { name, amount } = this.goalForm.value;
    const submit$ = this.goal$.pipe(
      take(1),
      switchMap((goal) =>
        !!goal
          ? this.goalService.updateGoal(goal.id, { name, amount })
          : this.goalService.addGoal({ name, amount }),
      ),
    );
    submit$.subscribe(() => {
      this.router.navigate(['..'], { relativeTo: this.route });
    });
  }
}
