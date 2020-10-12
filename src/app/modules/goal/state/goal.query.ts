import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { GoalState, GoalStore } from './goal.store';

@Injectable({ providedIn: 'root' })
export class GoalQuery extends QueryEntity<GoalState> {
  constructor(protected store: GoalStore) {
    super(store);
  }
}
