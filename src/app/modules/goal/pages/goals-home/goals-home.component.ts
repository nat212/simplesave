import { Component, OnInit } from '@angular/core';
import { Goal } from '@modules/goal/state/goal.model';
import { GoalQuery } from '@modules/goal/state/goal.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'ss-goals-home',
  templateUrl: './goals-home.component.html',
  styleUrls: ['./goals-home.component.scss'],
})
export class GoalsHomeComponent implements OnInit {
  public goals$: Observable<Goal[]>;
  constructor(private goalQuery: GoalQuery) {}

  public ngOnInit(): void {
    this.goals$ = this.goalQuery.selectAll();
  }
}
