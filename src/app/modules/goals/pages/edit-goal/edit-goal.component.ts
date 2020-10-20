import { Component, OnInit } from '@angular/core';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { Goal } from '@modules/goal/state/goal.model';
import { GoalQuery } from '@modules/goal/state/goal.query';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ss-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.scss'],
})
export class EditGoalComponent implements OnInit {
  goal$: Observable<Goal>;

  constructor(private goalQuery: GoalQuery, private routerQuery: RouterQuery) {}

  ngOnInit(): void {
    this.goal$ = this.routerQuery
      .selectParams()
      .pipe(
        switchMap((params) =>
          params.has('id') ? this.goalQuery.selectEntity(params.get('id')) : of(null),
        ),
      );
  }
}
